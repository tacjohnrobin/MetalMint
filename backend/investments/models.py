from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from decimal import Decimal

class GoldPrice(models.Model):
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)
    change_24h = models.DecimalField(max_digits=5, decimal_places=2)
    source = models.CharField(max_length=50)

    class Meta:
        get_latest_by = 'timestamp'
        indexes = [models.Index(fields=['timestamp'])]
        constraints = [
            models.CheckConstraint(check=models.Q(price__gt=0), name='positive_price'),
        ]

    def __str__(self):
        return f"{self.price} at {self.timestamp}"

class InvestmentPackage(models.Model):
    TIER_CHOICES = [
        (500, 'Starter', Decimal('0.001332')),    # Adjusted daily ROI
        (1500, 'Silver', Decimal('0.001332')),
        (5000, 'Gold', Decimal('0.001332')),
        (7500, 'Platinum', Decimal('0.001332')),
        (10000, 'Diamond', Decimal('0.001332')),
        (25000, 'VIP', Decimal('0.001332')),
    ]
    tier = models.IntegerField(choices=[(t[0], t[1]) for t in TIER_CHOICES], unique=True)
    daily_roi = models.DecimalField(max_digits=7, decimal_places=6, editable=False)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        for t in self.TIER_CHOICES:
            if t[0] == self.tier:
                self.daily_roi = t[2]
                break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_tier_display()} (${self.tier}) - {self.daily_roi*100}%/day"

class UserInvestment(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='investments')
    package = models.ForeignKey(InvestmentPackage, on_delete=models.PROTECT)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    initial_investment = models.DecimalField(max_digits=15, decimal_places=2)
    current_value = models.DecimalField(max_digits=15, decimal_places=2)
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
    def days_remaining(self):
        return max(0, (self.end_date - timezone.now()).days)