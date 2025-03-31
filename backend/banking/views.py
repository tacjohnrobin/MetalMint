from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.utils import timezone
from .services import PaymentService, ConversionService
from .models import Transaction
from investments.models import GoldPrice
from django.db import transaction
import logging
from rest_framework import generics
from .serializers import TransactionSerializer, ConversionSerializer

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
            tx = request.user.deposit(amount, stripe_payment_id=intent.id, status='pending')
            return Response({"client_secret": intent.client_secret}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            if e.code == 'service_unavailable':
                return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            logger.error(f"Deposit failed for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
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
        try:
            with transaction.atomic():
                payout = PaymentService.create_payout(user, amount)
                tx = user.withdraw(amount, currency, status='pending')
                tx.stripe_payment_id = payout.id
                tx.status = 'completed' if payout.status == 'paid' else 'pending'
                tx.save(update_fields=['stripe_payment_id', 'status'])

                if tx.status == 'completed':
                    tx.completed_at = timezone.now()
                    tx.save(update_fields=['completed_at'])

                return Response(
                    {"status": "Withdrawal processed", "payout_id": payout.id},
                    status=status.HTTP_201_CREATED
                )
        except ValidationError as e:
            if e.code == 'service_unavailable':
                return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            Transaction.log_failure(request.user, 'withdrawal', str(e))
            logger.error(f"Withdrawal failed for {user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
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
            tx = Transaction.objects.get(stripe_payment_id=event.data.object.id)
            if event.type == 'payment_intent.succeeded':
                if tx.status != 'completed':
                    tx.process_deposit(event.data.object.id)
                    logger.info(f"Deposit completed for {tx.user.email}: {tx.amount} {tx.currency}")
            elif event.type == 'payout.paid':
                if tx.status != 'completed':
                    tx.status = 'completed'
                    tx.completed_at = timezone.now()
                    tx.save(update_fields=['status', 'completed_at'])
                    logger.info(f"Withdrawal completed for {tx.user.email}: {tx.amount} {tx.currency}")
            elif event.type == 'payout.failed':
                if tx.status != 'completed':
                    tx.status = 'failed'
                    tx.metadata['error'] = event.data.object.get('failure_message', 'Unknown failure')
                    tx.save(update_fields=['status', 'metadata'])
                    if tx.currency == 'USD':
                        tx.user.usd_balance += tx.amount
                    elif tx.currency == 'USXW':
                        tx.user.usxw_balance += tx.amount
                    tx.user.save(update_fields=['usd_balance', 'usxw_balance'])
                    logger.error(f"Payout failed for {tx.user.email}: {tx.metadata['error']}")
        return HttpResponse(status=200)
    except Transaction.DoesNotExist:
        logger.error(f"Webhook failed: Transaction not found for event {event.type}")
        return HttpResponse(status=400)
    except Exception as e:
        logger.error(f"Webhook failed: {str(e)}")
        return HttpResponse(status=400)

class ConversionAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConversionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        direction = serializer.validated_data['direction']
        amount = serializer.validated_data['amount']
        try:
            if direction == 'usd_to_usxw':
                tx = ConversionService.convert_usd_to_usxw(request.user, amount)
                converted_amount = tx.metadata['converted_to']
                message = f"Converted {amount} USD to {converted_amount}"
            elif direction == 'usxw_to_usd':
                tx = ConversionService.convert_usxw_to_usd(request.user, amount)
                converted_amount = tx.metadata['converted_to']
                message = f"Converted {amount} USXW to {converted_amount}"
            return Response({
                "message": message,
                "transaction_id": tx.id,
                "usd_balance": request.user.usd_balance,
                "usxw_balance": request.user.usxw_balance
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            logger.error(f"Conversion failed for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        logger.debug(f"Fetching transactions for user: {user.email}")
        return Transaction.objects.filter(user=user)

class TransactionDetailView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def post(self, request):
        identifier = request.data.get('stripe_payment_id') or request.data.get('id')
        if not identifier:
            logger.warning(f"Detail request by {request.user.email} missing identifier")
            return Response({"error": "Stripe payment ID or transaction ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if identifier.isdigit():
                transaction = self.get_queryset().get(id=int(identifier))
            else:
                transaction = self.get_queryset().get(stripe_payment_id=identifier)
            serializer = self.serializer_class(transaction)
            logger.debug(f"Transaction details retrieved for {request.user.email}: {identifier}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Transaction.DoesNotExist:
            logger.warning(f"Transaction {identifier} not found for {request.user.email}")
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error retrieving transaction for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)