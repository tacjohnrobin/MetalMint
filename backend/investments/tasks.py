from celery import shared_task
from celery.signals import worker_ready
from django.utils import timezone
from django.db import transaction
from .models import UserInvestment, GoldPrice
from banking.models import Transaction
import logging
from decimal import Decimal
import random
import math

@shared_task
def process_daily_payouts():
    for investment in UserInvestment.objects.filter(is_active=True):
        try:
            with transaction.atomic():
                # Calculate daily payout in USD
                payout_usd = (investment.current_value * investment.package.daily_roi).quantize(Decimal('0.01'))
                latest_gold_price = GoldPrice.objects.latest('timestamp').price
                payout_usxw = (payout_usd / latest_gold_price).quantize(Decimal('0.01'))

                # Record daily payout in USXW
                tx = Transaction.objects.create(
                    user=investment.user,
                    amount=payout_usxw,
                    currency='USXW',
                    transaction_type='payout',
                    status='completed',
                    gold_price_at_time=latest_gold_price,
                    completed_at=timezone.now(),
                    metadata={'usd_equivalent': str(payout_usd)}
                )

                # Update user's USXW balance
                investment.user.usxw_balance += payout_usxw
                investment.user.save(update_fields=['usxw_balance'])

                # Update investment metrics
                investment.current_value += payout_usd
                investment.total_earned_usxw += payout_usxw  # Updated field name

                # Check for end of investment period
                if timezone.now() >= investment.end_date:
                    final_usxw = (investment.current_value / latest_gold_price).quantize(Decimal('0.01'))
                    final_tx = Transaction.objects.create(
                        user=investment.user,
                        amount=final_usxw,
                        currency='USXW',
                        transaction_type='payout',
                        status='completed',
                        gold_price_at_time=latest_gold_price,
                        completed_at=timezone.now(),
                        metadata={'usd_equivalent': str(investment.current_value), 'note': 'Final investment payout'}
                    )
                    investment.user.usxw_balance += final_usxw
                    investment.user.save(update_fields=['usxw_balance'])
                    investment.is_active = False

                investment.save(update_fields=['current_value', 'total_earned_usxw', 'is_active'])  # Updated field name

                logger.info(f"Payout of {payout_usd} USD ({payout_usxw} USXW) processed for {investment.user.email}")
        except Exception as e:
            Transaction.log_failure(
                investment.user,
                'payout',
                f"Investment {investment.id} failed: {str(e)}"
            )
            logger.error(f"Payout failed for {investment.user.email}: {str(e)}")

@shared_task
def update_gold_prices():
    """Update gold prices with GBM simulation"""
    try:
        mu = Decimal('0.03')  # 3% annual return
        sigma = Decimal('0.12')  # 12% annual volatility
        dt = Decimal('1.0') / (365 * 24)  # 1 hour
        long_term_mean = Decimal('1800.00')  # Long term average price
        reversion_strength = Decimal('0.005')  # Strength of mean reversion

        try:
            latest = GoldPrice.objects.latest('timestamp')
            latest_price = latest.price
            base_price = latest.price
        except GoldPrice.DoesNotExist:
            latest_price = long_term_mean
            base_price = long_term_mean

        drift = mu - (sigma ** 2) / 2
        random_factor = Decimal(str(random.gauss(0, 1)))
        reversion = reversion_strength * (long_term_mean - latest_price) * dt
        exponent = drift * dt + sigma * Decimal(math.sqrt(float(dt))) * random_factor + reversion
        new_price = latest_price * Decimal(math.exp(float(exponent)))
        new_price = new_price.quantize(Decimal('0.01'))

        change_24h = ((new_price - base_price) / base_price * 100).quantize(Decimal('0.01')) if base_price else Decimal('0.00')

        gold_price = GoldPrice.objects.create(
            price=new_price,
            change_24h=change_24h,
            source='GBM_Simulation',
            timestamp=timezone.now()
        )
        logger.info(f"Simulated gold price: {new_price} (24h change: {change_24h}%)")
        return float(new_price)
    except Exception as e:
        logger.error(f"Gold price simulation failed: {str(e)}")
        raise

@worker_ready.connect
def at_start(sender, **kwargs):
    with sender.app.connection() as conn:
        sender.app.send_task('investments.tasks.update_gold_prices')
