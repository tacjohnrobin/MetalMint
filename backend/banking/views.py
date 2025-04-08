from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.utils import timezone
from .services import PaymentService, ConversionService
from .models import Transaction
from investments.models import GoldPrice
from django.db import transaction
import logging
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth import get_user_model
from decimal import Decimal
import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from .serializers import TransactionSerializer, ConversionSerializer
import time
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

logger = logging.getLogger(__name__)

User = get_user_model()

stripe.api_key = settings.STRIPE_SECRET_KEY

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
            logger.info(f"Initiating deposit for {request.user.email}: {amount} USD")
            intent = PaymentService.create_payment_intent(request.user, amount)
            logger.info(f"Payment intent created: stripe_payment_id={intent.id}")

            with transaction.atomic():
                tx = request.user.deposit(
                    amount=amount,
                    currency='USD',
                    stripe_payment_id=intent.id,
                    status='pending'
                )
                logger.info(f"Transaction created: id={tx.id}, stripe_payment_id={intent.id}")
                tx.metadata = {
                    'user_id': str(request.user.pkid),
                    'payment_intent_id': intent.id,
                    'created_via': 'DepositAPI'
                }
                tx.save(update_fields=['metadata'])
                logger.info(f"Metadata updated: id={tx.id}")

            saved_tx = Transaction.objects.get(id=tx.id, user=request.user, stripe_payment_id=intent.id)
            logger.info(f"Transaction verified in DB: id={saved_tx.id}, status={saved_tx.status}")

            return Response(
                {"client_secret": intent.client_secret, "payment_intent_id": intent.id},
                status=status.HTTP_201_CREATED
            )
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Transaction.DoesNotExist:
            logger.error(f"Transaction not found after save: stripe_payment_id={intent.id}")
            return Response({"error": "Transaction failed to save"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class WithdrawalAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        currency = request.data.get('currency', 'USD').upper()

        # Validate amount
        try:
            amount = float(amount)
            if amount <= 0:
                return Response({"error": "Amount must be positive"}, status=status.HTTP_400_BAD_REQUEST)
        except (ValueError, TypeError):
            return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate currency
        if currency not in ['USD', 'USXW']:
            return Response({"error": f"Unsupported currency: {currency}"}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        try:
            logger.info(f"Initiating withdrawal for {user.email}: {amount} {currency}")
            if not user.stripe_account_id:
                account_id = user.create_stripe_express_account()
                account_link = stripe.AccountLink.create(
                    account=account_id,
                    refresh_url=f"{settings.FRONTEND_URL}/stripe/refresh",
                    return_url=f"{settings.FRONTEND_URL}/stripe/return",
                    type='account_onboarding'
                )
                logger.info(f"Onboarding required for {user.email}: account_id={account_id}")
                return Response(
                    {"status": "Onboarding required", "onboarding_url": account_link.url},
                    status=status.HTTP_202_ACCEPTED
                )

            # Check if bank account exists
            external_accounts = stripe.Account.list_external_accounts(
                user.stripe_account_id,
                object='bank_account',
                limit=1
            )
            if not external_accounts.data and getattr(settings, 'STRIPE_TEST_MODE', False):
                account_link = stripe.AccountLink.create(
                    account=user.stripe_account_id,
                    refresh_url=f"{settings.FRONTEND_URL}/stripe/refresh",
                    return_url=f"{settings.FRONTEND_URL}/stripe/return",
                    type='account_onboarding'
                )
                logger.info(f"Bank account missing for {user.email}: prompting onboarding")
                return Response(
                    {"status": "Onboarding required", "onboarding_url": account_link.url},
                    status=status.HTTP_202_ACCEPTED
                )

            payout = PaymentService.create_payout(user, amount)
            logger.info(f"Payout initiated: payout_id={payout.id}, status={payout.status}")

            with transaction.atomic():
                tx_status = 'pending' if payout.status == 'pending' else 'completed'
                tx = user.withdraw(
                    amount=amount,
                    currency=currency,
                    stripe_payment_id=payout.id,
                    status=tx_status
                )
                logger.info(f"Transaction created: id={tx.id}, stripe_payment_id={payout.id}, status={tx_status}")
                tx.metadata = {
                    'user_id': str(user.pkid),
                    'payout_id': payout.id,
                    'created_via': 'WithdrawalAPI'
                }
                tx.save(update_fields=['metadata'])
                logger.info(f"Metadata updated: id={tx.id}")

                saved_tx = Transaction.objects.get(id=tx.id, user=user, stripe_payment_id=payout.id)
                logger.info(f"Transaction verified in DB: id={saved_tx.id}, status={saved_tx.status}")

            response_data = {
                "status": "Withdrawal initiated",
                "transaction_id": str(tx.id),
                "payout_id": payout.id,
                "amount": str(amount),
                "currency": currency,
                "transaction_status": saved_tx.status
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except stripe.error.StripeError as e:
            logger.error(f"Stripe error: {str(e)}")
            Transaction.log_failure(user, 'withdrawal', str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            logger.error(f"Validation error: {str(e)}")
            Transaction.log_failure(user, 'withdrawal', str(e))
            if e.code == 'service_unavailable':
                return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Transaction.DoesNotExist:
            logger.error(f"Transaction not found after save: stripe_payment_id={payout.id}")
            return Response({"error": "Transaction failed to save"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            Transaction.log_failure(user, 'withdrawal', str(e))
            return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def deposit_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    if not sig_header:
        logger.error("No Stripe-Signature header provided in deposit webhook")
        return HttpResponse(status=400)

    try:
        event = PaymentService.handle_webhook(payload, sig_header)
        logger.info(f"Deposit webhook event received: type={event.type}, id={event.id}")
        user_id = event.data.object.metadata.get('user_id')

        if not user_id:
            logger.info(f"Skipping deposit event without user_id: {event.type}, id={event.id}")
            return HttpResponse(status=200)

        user = User.objects.get(pkid=user_id)
        stripe_payment_id = event.data.object.payment_intent if event.type == 'charge.succeeded' else event.data.object.id
        logger.info(f"Processing deposit webhook for {user.email}: event={event.type}, stripe_payment_id={stripe_payment_id}")

        with transaction.atomic():
            retries = 3
            tx = None
            for attempt in range(retries):
                try:
                    tx = Transaction.objects.get(user=user, stripe_payment_id=stripe_payment_id)
                    break
                except Transaction.DoesNotExist:
                    if attempt < retries - 1:
                        time.sleep(1)
                        continue
                    return HttpResponse(status=200)

            if event.type == 'payment_intent.created':
                if tx.status != 'pending':
                    tx.status = 'pending'
                    tx.metadata['event_type'] = event.type
                    tx.save(update_fields=['status', 'metadata'])
            elif event.type in ['payment_intent.succeeded', 'charge.succeeded']:
                if tx.status != 'completed':
                    tx.process_deposit(stripe_payment_id)
                    # Broadcast update
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        f"user_{user.pkid}",
                        {
                            "type": "transaction_update",
                            "transaction_id": str(tx.id),
                            "status": tx.status,
                            "amount": str(tx.amount),
                            "currency": tx.currency,
                            "usd_balance": str(user.usd_balance),
                        }
                    )

            logger.info(f"Deposit webhook processed: event={event.type}, tx_id={tx.id}")
        return HttpResponse(status=200)

    except Exception as e:
        logger.error(f"Deposit webhook failed: {str(e)}")
        return HttpResponse(status=400)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def withdrawal_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    if not sig_header:
        logger.error("No Stripe-Signature header provided in withdrawal webhook")
        return HttpResponse(status=400)

    try:
        event = PaymentService.handle_webhook(payload, sig_header)
        logger.info(f"Withdrawal webhook event received: type={event.type}, id={event.id}")
        user_id = event.data.object.metadata.get('user_id')

        if not user_id:
            logger.info(f"Skipping withdrawal event without user_id: {event.type}, id={event.id}")
            return HttpResponse(status=200)

        user = User.objects.get(pkid=user_id)
        stripe_payment_id = event.data.object.id
        logger.info(f"Processing withdrawal webhook for {user.email}: event={event.type}, stripe_payment_id={stripe_payment_id}")

        with transaction.atomic():
            retries = 3
            tx = None
            for attempt in range(retries):
                try:
                    tx = Transaction.objects.get(user=user, stripe_payment_id=stripe_payment_id)
                    break
                except Transaction.DoesNotExist:
                    if attempt < retries - 1:
                        time.sleep(1)
                        continue
                    break

            if event.type == 'payout.created':
                if tx and tx.status != 'pending':
                    tx.status = 'pending'
                    tx.metadata['event_type'] = event.type
                    tx.save(update_fields=['status', 'metadata'])
            elif event.type == 'payout.paid':
                if tx and tx.status != 'completed':
                    tx.process_withdrawal(stripe_payment_id)
                    # Broadcast update
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        f"user_{user.pkid}",
                        {
                            "type": "transaction_update",
                            "transaction_id": str(tx.id),
                            "status": tx.status,
                            "amount": str(tx.amount),
                            "currency": tx.currency,
                            "usd_balance": str(user.usd_balance),
                        }
                    )
            elif event.type == 'payout.failed':
                if tx and tx.status != 'failed':
                    tx.status = 'failed'
                    tx.metadata['error'] = event.data.object.get('failure_message', 'Unknown failure')
                    tx.save(update_fields=['status', 'metadata'])
                    if tx.currency == 'USD':
                        tx.user.usd_balance += tx.amount
                    elif tx.currency == 'USXW':
                        tx.user.usxw_balance += tx.amount
                    tx.user.save(update_fields=['usd_balance', 'usxw_balance'])
                    # Broadcast failure
                    channel_layer = get_channel_layer()
                    async_to_sync(channel_layer.group_send)(
                        f"user_{user.pkid}",
                        {
                            "type": "transaction_update",
                            "transaction_id": str(tx.id),
                            "status": tx.status,
                            "amount": str(tx.amount),
                            "currency": tx.currency,
                            "usd_balance": str(user.usd_balance),
                        }
                    )

            if tx:
                logger.info(f"Withdrawal webhook processed: event={event.type}, tx_id={tx.id}")
        return HttpResponse(status=200)

    except Exception as e:
        logger.error(f"Withdrawal webhook failed: {str(e)}")
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
        return Transaction.objects.filter(user=user).order_by('-created_at')

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