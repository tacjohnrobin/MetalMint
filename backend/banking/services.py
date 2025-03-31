import stripe
from django.conf import settings
from django.db import transaction
from .models import Transaction
import logging
from decimal import Decimal


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
                metadata={'user_id': str(user.pkid)}
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
            return event
        except ValueError as e:
            logger.error(f"Invalid webhook signature: {str(e)}")
            raise
        except stripe.error.StripeError as e:
            logger.error(f"Webhook error: {str(e)}")
            raise
    
class ConversionService:
    @staticmethod
    def convert_usd_to_usxw(user, amount):
        from .models import Transaction
        from investments.models import GoldPrice

        user._ensure_gbm_price()
        with transaction.atomic():
            amount = Decimal(str(amount))
            if amount <= 0:
                raise ValidationError(_("Conversion amount must be positive"))
            if user.usd_balance < amount:
                raise ValidationError(_("Insufficient USD balance"))
            
            gold_price = GoldPrice.objects.latest('timestamp').price
            usxw_amount = (amount / gold_price).quantize(Decimal('0.01'))

            user.usd_balance -= amount
            user.usxw_balance += usxw_amount
            user.save(update_fields=['usd_balance', 'usxw_balance'])

            tx = Transaction.objects.create(
                user=user,
                amount=amount,
                currency='USD',
                transaction_type='conversion',
                status='completed',
                gold_price_at_time=gold_price,
                metadata={'converted_to': f"{usxw_amount} USXW"}
            )
            logger.info(f"Converted {amount} USD to {usxw_amount} USXW for {user.email}")
            return tx

    @staticmethod
    def convert_usxw_to_usd(user, amount):
        from .models import Transaction
        from investments.models import GoldPrice

        user._ensure_gbm_price()
        with transaction.atomic():
            amount = Decimal(str(amount))
            if amount <= 0:
                raise ValidationError(_("Conversion amount must be positive"))
            if user.usxw_balance < amount:
                raise ValidationError(_("Insufficient USXW balance"))
            
            gold_price = GoldPrice.objects.latest('timestamp').price
            usd_amount = (amount * gold_price).quantize(Decimal('0.01'))

            user.usxw_balance -= amount
            user.usd_balance += usd_amount
            user.save(update_fields=['usd_balance', 'usxw_balance'])

            tx = Transaction.objects.create(
                user=user,
                amount=amount,
                currency='USXW',
                transaction_type='conversion',
                status='completed',
                gold_price_at_time=gold_price,
                metadata={'converted_to': f"{usd_amount} USD"}
            )
            logger.info(f"Converted {amount} USXW to {usd_amount} USD for {user.email}")
            return tx