# analytics/services.py
from investments.models import GoldPrice
from .models import PortfolioSnapshot
from decimal import Decimal

class PortfolioAnalyzer:
    def __init__(self, user):
        self.user = user
        self.current_price = GoldPrice.objects.latest('timestamp').price

    def calculate_total_value(self):
        investment_value = sum(
            inv.current_value for inv in self.user.investments.filter(is_active=True)
        ) or Decimal('0.00')
        return (
            self.user.usd_balance +
            (self.user.usxw_balance * self.current_price) +
            investment_value
        ).quantize(Decimal('0.01'))

    def generate_snapshot(self):
        active_investments = self.user.investments.filter(is_active=True)
        total_invested = sum(inv.package.tier for inv in active_investments) or Decimal('0.00')
        total_value = self.calculate_total_value()

        snapshot = PortfolioSnapshot.objects.create(
            user=self.user,
            total_value=total_value,
            gold_price=self.current_price,
            usd_balance=self.user.usd_balance,
            usxw_balance=self.user.usxw_balance,
            total_invested=total_invested,
            investment_count=active_investments.count()
        )
        snapshot.calculate_daily_change()
        return snapshot

    def generate_report(self):
        active_investments = self.user.investments.filter(is_active=True)
        total_invested = sum(inv.package.tier for inv in active_investments) or Decimal('0.00')

        return {
            "current_gold_price": self.current_price,
            "usd_balance": self.user.usd_balance,
            "usxw_balance": self.user.usxw_balance,
            "total_invested": total_invested,
            "total_value": self.calculate_total_value(),
            "daily_change": self.get_daily_change(),
            "active_investments": [
                {
                    "id": inv.id,
                    "package": inv.package.get_tier_display(),
                    "current_value": inv.current_value,
                    "daily_return": inv.package.daily_roi,  
                    "days_remaining": inv.days_remaining
                } for inv in active_investments
            ]
        }

    def get_daily_change(self):
        latest_snapshot = PortfolioSnapshot.objects.filter(user=self.user).order_by('-timestamp').first()
        return latest_snapshot.daily_change if latest_snapshot and latest_snapshot.daily_change is not None else Decimal('0.00')