# investments/management/commands/seed_gold_price.py
from django.core.management.base import BaseCommand
from investments.models import GoldPrice
from decimal import Decimal
from django.utils import timezone

class Command(BaseCommand):
    help = 'Seeds an initial gold price record if none exists'

    def handle(self, *args, **kwargs):
        if not GoldPrice.objects.exists():
            GoldPrice.objects.create(
                price=Decimal('1800.00'),
                change_24h=Decimal('0.00'),
                source='InitialSeed',
                timestamp=timezone.now()
            )
            self.stdout.write(self.style.SUCCESS('Initial gold price seeded: $1800.00'))
        else:
            self.stdout.write(self.style.WARNING('Gold price data already exists'))