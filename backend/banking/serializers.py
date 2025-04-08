from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Transaction
from decimal import Decimal

class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'currency', 'transaction_type', 'status', 'gold_price_at_time', 'created_at', 'completed_at', 'metadata', 'stripe_payment_id']

class ConversionSerializer(serializers.Serializer):
    DIRECTION_CHOICES = (
        ('usd_to_usxw', 'USD to USXW'),
        ('usxw_to_usd', 'USXW to USD'),
    )
    direction = serializers.ChoiceField(choices=DIRECTION_CHOICES, help_text="Direction of currency conversion")
    amount = serializers.DecimalField(max_digits=15, decimal_places=2, min_value=Decimal('0.01'))