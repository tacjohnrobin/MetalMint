from django.db import models
from django.utils import timezone
from decimal import Decimal

class PortfolioSnapshot(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='portfolio_snapshots')
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    total_value = models.DecimalField(max_digits=15, decimal_places=2)  # USD + USXW (gold-adjusted) + investments
    gold_price = models.DecimalField(max_digits=10, decimal_places=2)  # From GoldPrice latest
    usd_balance = models.DecimalField(max_digits=15, decimal_places=2)
    usxw_balance = models.DecimalField(max_digits=15, decimal_places=2)
    total_invested = models.DecimalField(max_digits=15, decimal_places=2)  # Sum of active investments' initial tiers
    investment_count = models.PositiveIntegerField(default=0)  # Number of active investments
    daily_change = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Day-over-day % change

    class Meta:
        indexes = [
            models.Index(fields=['user', 'timestamp']),
            models.Index(fields=['timestamp']),
        ]
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.email} - {self.timestamp} - ${self.total_value}"

    def calculate_daily_change(self):
        """Calculate percentage change from the previous snapshot"""
        previous = PortfolioSnapshot.objects.filter(
            user=self.user,
            timestamp__lt=self.timestamp
        ).order_by('-timestamp').first()
        if previous and previous.total_value > 0:
            change = ((self.total_value - previous.total_value) / previous.total_value) * 100
            self.daily_change = change.quantize(Decimal('0.01')) 
            self.save(update_fields=['daily_change'])