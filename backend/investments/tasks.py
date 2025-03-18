from celery import shared_task
from django.utils import timezone
from django.db import transaction
from .models import UserInvestment, GoldPrice
from banking.models import Transaction
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@shared_task
def process_daily_payouts():
    """Process fixed daily payouts for active investments"""
    for investment in UserInvestment.objects.filter(is_active=True):
        try:
            with transaction.atomic():
                payout = investment.package.daily_return  # Fixed return in USXW
                tx = investment.user.deposit(payout, currency='USXW')
                tx.gold_price_at_time = GoldPrice.objects.latest('timestamp').price
                tx.transaction_type = 'payout'
                tx.save(update_fields=['gold_price_at_time', 'transaction_type'])

                investment.total_earned += payout
                investment.save(update_fields=['total_earned'])

                if timezone.now() >= investment.end_date:
                    investment.is_active = False
                    investment.save(update_fields=['is_active'])

                logger.info(f"Payout of {payout} USXW processed for {investment.user.email}")
        except Exception as e:
            Transaction.log_failure(
                investment.user,
                'payout',
                f"Investment {investment.id} failed: {str(e)}"
            )
            logger.error(f"Payout failed for {investment.user.email}: {str(e)}")

@shared_task
def update_gold_prices():
    """Update gold prices from GoldAPI"""
    try:
        response = requests.get(
            'https://www.goldapi.io/api/XAU/USD',
            headers={'x-access-token': settings.GOLD_API_KEY}
        )
        response.raise_for_status()
        data = response.json()

        latest_price = GoldPrice.objects.latest('timestamp').price
        new_price = data['price']
        change = ((new_price - latest_price) / latest_price) * 100 if latest_price else 0

        GoldPrice.objects.create(
            price=new_price,
            change_24h=change,
            source='GoldAPI'
        )
        logger.info(f"Gold price updated: {new_price} (24h change: {change}%)")
    except Exception as e:
        logger.error(f"Gold price update failed: {str(e)}")