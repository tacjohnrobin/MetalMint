from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.utils import timezone
from .services import PaymentService
from .models import Transaction
from investments.models import GoldPrice
from django.db import transaction
import logging

logger = logging.getLogger(__name__)

class DepositAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        try:
            amount = float(amount)
            if amount <= 0:
                return Response({"error": "Amount must be positive"}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError):
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            intent = PaymentService.create_payment_intent(request.user, amount)
            tx = Transaction.objects.create(
                user=request.user,
                amount=amount,
                currency='USD',
                transaction_type='deposit',
                status='pending',
                stripe_payment_id=intent.id,
                gold_price_at_time=GoldPrice.objects.latest('timestamp').price
            )
            return Response({"client_secret": intent.client_secret}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Deposit failed for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class WithdrawalAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'USD')
        
        try:
            amount = float(amount)
            if amount <= 0:
                return Response({"error": "Amount must be positive"}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError):
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        if not user.is_kyc_valid():
            return Response({"detail": "KYC verification required"}, status=status.HTTP_403_FORBIDDEN)

        try:
            with transaction.atomic():
                payout = PaymentService.create_payout(user, amount)
                
                tx = user.withdraw(amount, currency, status='pending')
                tx.stripe_payment_id = payout.id
                tx.status = 'completed' if payout.status == 'paid' else 'pending'
                tx.gold_price_at_time = GoldPrice.objects.latest('timestamp').price
                tx.save(update_fields=['stripe_payment_id', 'status', 'gold_price_at_time'])

                if tx.status == 'completed':
                    tx.completed_at = timezone.now()
                    tx.save(update_fields=['completed_at'])

                return Response(
                    {"status": "Withdrawal processed", "payout_id": payout.id},
                    status=status.HTTP_201_CREATED
                )
        except Exception as e:
            Transaction.log_failure(request.user, 'withdrawal', str(e))
            logger.error(f"Withdrawal failed for {user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    try:
        event = PaymentService.handle_webhook(payload, sig_header)
        with transaction.atomic():
            if event.type == 'payment_intent.succeeded':
                tx = Transaction.objects.get(stripe_payment_id=event.data.object.id)
                if tx.status != 'completed':  # Prevent duplicate processing
                    tx.status = 'completed'
                    tx.completed_at = timezone.now()
                    tx.user.deposit(
                        amount=tx.amount,
                        currency=tx.currency,
                        stripe_payment_id=tx.stripe_payment_id,
                        status='completed'
                    )
                    tx.save(update_fields=['status', 'completed_at'])
                    logger.info(f"Deposit completed for {tx.user.email}: {tx.amount} {tx.currency}")
            elif event.type == 'payout.paid':
                tx = Transaction.objects.get(stripe_payment_id=event.data.object.id)
                if tx.status != 'completed':  # Prevent duplicate processing
                    tx.status = 'completed'
                    tx.completed_at = timezone.now()
                    tx.save(update_fields=['status', 'completed_at'])
                    logger.info(f"Withdrawal completed for {tx.user.email}: {tx.amount} {tx.currency}")
        return HttpResponse(status=200)
    except Transaction.DoesNotExist:
        logger.error(f"Webhook failed: Transaction not found for event {event.type}")
        return HttpResponse(status=400)
    except Exception as e:
        logger.error(f"Webhook failed: {str(e)}")
        return HttpResponse(status=400)

class TransactionHistoryAPI(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        transactions = Transaction.objects.filter(user=request.user)
        data = [{
            'id': tx.id,
            'amount': tx.amount,
            'currency': tx.currency,
            'type': tx.transaction_type,
            'status': tx.status,
            'gold_price': tx.gold_price_at_time,
            'timestamp': tx.created_at
        } for tx in transactions]
        return Response(data, status=status.HTTP_200_OK)