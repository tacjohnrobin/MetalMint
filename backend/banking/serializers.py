from rest_framework.serializers import ModelSerializer
from .models import Transaction

class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'currency', 'transaction_type', 'status', 'gold_price_at_time', 'created_at']