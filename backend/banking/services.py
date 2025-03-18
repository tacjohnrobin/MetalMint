import stripe
from django.conf import settings
from django.db import transaction
from .models import Transaction
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentService:
    @staticmethod
    def create_payment_intent(user, amount):
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),
                currency='usd',
                customer=user.stripe_customer_id,
                payment_method_types=['card'],
                metadata={'user_id': str(user.client_id)}
            )
            return intent
        except stripe.error.StripeError as e:
            Transaction.log_failure(user, 'deposit', str(e))
            raise
    
    @staticmethod
    def create_payout(user, amount):
        try:
            payout = stripe.Payout.create(
                amount=int(amount * 100),
                currency='usd',
                destination=user.stripe_account_id,
            )
            return payout
        except stripe.error.StripeError as e:
            Transaction.log_failure(user, 'withdrawal', str(e))
            raise
    
    @staticmethod
    def handle_webhook(payload, sig_header):
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
            if event.type == 'payment_intent.succeeded':
                PaymentService._handle_payment_success(event.data.object)
            elif event.type == 'payout.paid':
                PaymentService._handle_payout_success(event.data.object)
            elif event.type == 'payout.failed':
                PaymentService._handle_payout_failure(event.data.object)
        except ValueError as e:
            logger.error(f"Invalid webhook signature: {str(e)}")
            raise
        except stripe.error.StripeError as e:
            logger.error(f"Webhook error: {str(e)}")
            raise
    
    @staticmethod
    def _handle_payment_success(intent):
        try:
            tx = Transaction.objects.get(
                stripe_payment_id=intent.id,
                status='pending'
            )
            tx.process_deposit(stripe_payment_id=intent.id)
        except Transaction.DoesNotExist:
            Transaction.log_failure(
                tx.user if 'tx' in locals() else None,
                'deposit',
                f"Transaction not found for payment intent {intent.id}"
            )
            raise ValueError(f"Transaction not found for payment intent {intent.id}")

    @staticmethod
    def _handle_payout_success(payout):
        try:
            tx = Transaction.objects.get(
                stripe_payment_id=payout.id,
                status='pending'
            )
            tx.status = 'completed'
            tx.completed_at = timezone.now()
            tx.save(update_fields=['status', 'completed_at'])
            logger.info(f"Payout {payout.id} completed for {tx.user.email}")
        except Transaction.DoesNotExist:
            logger.error(f"Payout {payout.id} not found in transactions")

    @staticmethod
    def _handle_payout_failure(payout):
        try:
            tx = Transaction.objects.get(
                stripe_payment_id=payout.id,
                status='pending'
            )
            tx.status = 'failed'
            tx.metadata['error'] = payout.failure_message or 'Unknown failure'
            tx.save(update_fields=['status', 'metadata'])
            logger.error(f"Payout {payout.id} failed for {tx.user.email}: {payout.failure_message}")
            # Note: Wallet was already deducted; manual refund may be needed
        except Transaction.DoesNotExist:
            logger.error(f"Failed payout {payout.id} not found in transactions")