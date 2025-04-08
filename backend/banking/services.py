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
                amount=int(float(amount) * 100),  # Ensure float compatibility
                currency='usd',
                customer=user.stripe_customer_id,
                payment_method_types=['card'],
                metadata={'user_id': str(user.pkid)}
            )
            logger.info(f"PaymentIntent created for {user.email}: intent_id={intent.id}, amount={amount} USD")
            return intent
        except stripe.error.StripeError as e:
            Transaction.log_failure(user, 'deposit', str(e))
            logger.error(f"PaymentIntent creation failed for {user.email}: {str(e)}")
            raise
    

    @staticmethod
    def create_payout(user, amount):
        try:
            # Ensure stripe express acc and bank acc exist
            if not user.stripe_account_id:
                user.create_stripe_express_account()
                raise ValidationError("Account onboarding required. Please complete setup via Stripe.")
            
            # verify account and bank details
            account = stripe.Account.retrieve(user.stripe_account_id)
            if account.type != 'express':
                logger.warning(f"Expected Express account for {user.email}, found {account.type}")

            # verify  funds
            amount = float(amount)
            if user.usd_balance < amount:
                raise ValidationError(f"Insufficient USD balance: {user.usd_balance} < {amount}")
            
            # get bank acc ID
            external_accounts = stripe.Account.list_external_accounts(
                user.stripe_account_id,
                object='bank_account',
                limit=1
            )
            if not external_accounts.data:
                logger.error(f"No bank account found for {user.stripe_account_id}")
                # Trigger Express onboarding in test mode if not already done
                if getattr(settings, 'STRIPE_TEST_MODE', False):
                    logger.info(f"Simulating bank account for Express account {user.stripe_account_id} in test mode")
                    raise ValidationError("No bank account available. Complete Stripe onboarding.")
                else:
                    raise Exception("No bank account available for payout")
            bank_account_id = external_accounts.data[0].id
            logger.info(f"Using bank account for payout: {bank_account_id}, routing={external_accounts.data[0].routing_number}")

            # Check stripe balance and fund if necessary in test mode only
            if getattr(settings, 'STRIPE_TEST_MODE', False):
                balance = stripe.Balance.retrieve(stripe_account=user.stripe_account_id)
                available_usd = next((b.amount for b in balance.available if b.currency == 'usd'), 0) / 100.0
                if available_usd < amount:
                    transfer = stripe.Transfer.create(
                        amount=int(amount * 100),
                        currency='usd',
                        destination=user.stripe_account_id,
                        metadata={'user_id': str(user.pkid)}
                    )
                    logger.info(f"Transferred {amount} USD to {user.stripe_account_id}: transfer_id={transfer.id}")

            # create payout
            payout = stripe.Payout.create(
                amount=int(amount * 100),
                currency='usd',
                destination=bank_account_id,
                stripe_account=user.stripe_account_id,
                metadata={'user_id': str(user.pkid)}
            )

            logger.info(f"Payout created for {user.email}: payout_id={payout.id}, amount={amount} USD, status={payout.status}")

            # Deduct balance
            user.usd_balance -= Decimal(str(amount))
            user.save(update_fields=['usd_balance'])

            return payout
        except stripe.error.StripeError as e:
            Transaction.log_failure(user, 'withdrawal', str(e))
            logger.error(f"Payout creation failed for {user.email}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error creating payout for {user.email}: {str(e)}")
            raise


    @staticmethod
    def handle_webhook(payload, sig_header):
        try:
            logger.debug(f"Webhook payload: {payload.decode('utf-8')[:100]}...")  # Truncate for brevity
            logger.debug(f"Received signature: {sig_header}")
            logger.debug(f"Expected secret: {settings.STRIPE_WEBHOOK_SECRET}")
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
            logger.info(f"Webhook received: event_id={event.id}, type={event.type}")
            return event
        except ValueError as e:
            logger.error(f"Invalid webhook signature: {str(e)}")
            raise
        except stripe.error.StripeError as e:
            logger.error(f"Webhook error: {str(e)}")
            raise

# ConversionService remains unchanged as it’s unrelated to withdrawals
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