# investments/management/commands/seed_packages.py
from django.core.management.base import BaseCommand
from investments.models import InvestmentPackage

class Command(BaseCommand):
    help = 'Seeds the database with initial investment packages'

    def handle(self, *args, **options):
        tiers = [
            (500, 'Starter'),
            (1500, 'Silver'),
            (5000, 'Gold'),
            (7500, 'Platinum'),
            (10000, 'Diamond'),
            (25000, 'VIP'),
        ]

        for tier_value, tier_name in tiers:
            package, created = InvestmentPackage.objects.get_or_create(
                tier=tier_value,
                defaults={'is_active': True}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created {tier_name} package'))
            else:
                self.stdout.write(f'{tier_name} package already exists')