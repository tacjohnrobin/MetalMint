from investments.models import GoldPrice
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Sum
from .models import PortfolioSnapshot

class PortfolioAnalyzer:
    def __init__(self, user):
        self.user = user
        try:
            self.current_price = GoldPrice.objects.latest('timestamp').price
        except ObjectDoesNotExist:
            self.current_price = 0  # Fallback if no gold price data
        
    def calculate_total_value(self):
        """Calculate total portfolio value: USD + USXW (in USD) + active investments"""
        investment_value = sum(
            inv.current_value for inv in self.user.investments.filter(is_active=True)
        )
        return (
            self.user.usd_balance +
            (self.user.usxw_balance * self.current_price) +
            investment_value
        )
    
    def generate_snapshot(self):
        """Generate and save a portfolio snapshot"""
        active_investments = self.user.investments.filter(is_active=True)
        total_invested = sum(inv.amount for inv in active_investments)
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
        snapshot.calculate_daily_change()  # Update daily change after creation
        return snapshot

    def generate_report(self):
        """Generate a detailed portfolio report"""
        active_investments = self.user.investments.filter(is_active=True)
        total_invested = sum(inv.amount for inv in active_investments)
        
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
                    "daily_return": inv.package.daily_return,
                    "days_remaining": inv.days_remaining
                } for inv in active_investments
            ]
        }
    
    def get_daily_change(self):
        """Get the most recent daily change percentage"""
        latest_snapshot = PortfolioSnapshot.objects.filter(user=self.user).order_by('-timestamp').first()
        return latest_snapshot.daily_change if latest_snapshot and latest_snapshot.daily_change is not None else 0