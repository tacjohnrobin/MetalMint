from rest_framework import serializers
from .models import InvestmentPackage, UserInvestment

class InvestmentPackageSerializer(serializers.ModelSerializer):
    tier_display = serializers.CharField(source='get_tier_display', read_only=True)
    total_return = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    class Meta:
        model = InvestmentPackage
        fields = ['id', 'tier', 'tier_display', 'daily_roi', 'total_return']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['total_return'] = instance.tier * 3 
        return data

class UserInvestmentSerializer(serializers.ModelSerializer):
    package = InvestmentPackageSerializer(read_only=True)
    days_remaining = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserInvestment
        fields = ['id', 'package', 'start_date', 'end_date', 'initial_investment', 'current_value', 'total_earned', 'days_remaining', 'is_active']

class InvestmentCreateSerializer(serializers.Serializer):
    package_id = serializers.IntegerField()

    def validate_package_id(self, value):
        if not InvestmentPackage.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Invalid or inactive investment package")
        return value