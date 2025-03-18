from django.db import models
from django.utils import timezone

class GoldPrice(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)
    change_24h = models.DecimalField(max_digits=5, decimal_places=2)
    source = models.CharField(max_length=50)

    class Meta:
        get_latest_by = 'timestamp'
        indexes = [models.Index(fields=['timestamp'])]

    def __str__(self):
        return f"{self.price} at {self.timestamp}"

class InvestmentPackage(models.Model):
    TIER_CHOICES = [
    (500, 'Starter', 0.52),
    (1500, 'Silver', 1.56),
    (5000, 'Gold', 5.19),
    (7500, 'Platinum', 7.79),
    (10000, 'Diamond', 10.38),
    (25000, 'VIP', 25.95),
]
    tier = models.IntegerField(choices=[(t[0], t[1]) for t in TIER_CHOICES], unique=True)
    daily_return = models.DecimalField(max_digits=5, decimal_places=2, editable=False)  # Fixed 300% over 1050 days
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        # Set daily_return based on tier during creation
        if not self.pk:
            for t in self.TIER_CHOICES:
                if t[0] == self.tier:
                    self.daily_return = t[2]
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_tier_display()} (${self.tier}) - {self.daily_return} USXW/day"

class UserInvestment(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='investments')
    package = models.ForeignKey(InvestmentPackage, on_delete=models.PROTECT)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    initial_gold_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_earned = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['end_date']),
        ]

    def __str__(self):
        return f"{self.user.email} - {self.package.get_tier_display()}"

    @property
    def current_value(self):
        """Calculate current value based on gold price variance"""
        try:
            latest_price = GoldPrice.objects.latest('timestamp').price
            base_value = self.package.tier * 3  # Fixed 300% return in USD
            variance_factor = latest_price / self.initial_gold_price
            return base_value * variance_factor  # Market-adjusted value in USD
        except GoldPrice.DoesNotExist:
            return self.package.tier * 3  # Default to fixed return if no gold price

    @property
    def days_remaining(self):
        """Days until investment matures"""
        return max(0, (self.end_date - timezone.now()).days)