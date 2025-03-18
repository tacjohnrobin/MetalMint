from django.db import models, transaction
from encrypted_model_fields.fields import EncryptedCharField
from user.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('conversion', 'Conversion'),
        ('investment', 'Investment'),
        ('payout', 'Payout')
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.CharField(max_length=4)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    stripe_payment_id = EncryptedCharField(max_length=100, blank=True)
    gold_price_at_time = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'transaction_type', 'status']),
            models.Index(fields=['created_at']),     
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.transaction_type} - {self.amount} {self.currency} ({self.status})"

    def save(self, *args, **kwargs):
        if self.pk and self.status == 'completed' and not self.completed_at:
            self.completed_at = timezone.now()
        super().save(*args, **kwargs)

    @classmethod
    def log_failure(cls, user, tx_type, error):
        with transaction.atomic():
            tx = cls.objects.create(
                user=user,
                amount=0,
                currency='USD',
                transaction_type=tx_type,
                status='failed',
                gold_price_at_time=0,
                metadata={'error': str(error)}
            )
            logger.error(f"Transaction {tx_type} failed for {user.email}: {error}")
            return tx
    
    def process_deposit(self, stripe_payment_id=None):
        if self.transaction_type != 'deposit' or self.status != 'pending':
            raise ValidationError(_("Only pending deposits can be processed"))
        
        with transaction.atomic():
            self.user.deposit(self.amount, self.currency, stripe_payment_id, status='completed')
            self.status = 'completed'
            self.stripe_payment_id = stripe_payment_id or self.stripe_payment_id
            self.completed_at = timezone.now()
            self.save(update_fields=['status', 'stripe_payment_id', 'completed_at'])

    def process_withdrawal(self):
        if self.transaction_type != 'withdrawal' or self.status != 'pending':
            raise ValidationError(_("Only pending withdrawals can be processed"))
        
        with transaction.atomic():
            self.user.withdraw(self.amount, self.currency, status='completed')
            self.status = 'completed'
            self.completed_at = timezone.now()
            self.save(update_fields=['status', 'completed_at'])
    
    def process_conversion(self):
        if self.transaction_type != 'conversion' or self.status != 'pending':
            raise ValidationError(_("Only pending conversions can be processed"))
        
        with transaction.atomic():
            self.user.convert_usd_to_usxw(self.amount)
            self.status = 'completed'
            self.completed_at = timezone.now()
            self.save(update_fields=['status', 'completed_at'])