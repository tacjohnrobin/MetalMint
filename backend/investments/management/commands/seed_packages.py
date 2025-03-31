from django.core.management.base import BaseCommand
from investments.models import InvestmentPackage

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for tier, _, daily_return in InvestmentPackage.TIER_CHOICES:
            InvestmentPackage.objects.get_or_create(
                tier=tier,
                defaults={'daily_return': daily_return}
            )
        self.stdout.write(self.style.SUCCESS('Investment packages seeded'))