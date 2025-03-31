from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils import timezone
from django.db import transaction
from django.core.exceptions import ValidationError
from .models import InvestmentPackage, UserInvestment, GoldPrice
from .serializers import InvestmentPackageSerializer, InvestmentCreateSerializer, UserInvestmentSerializer
from banking.models import Transaction
import logging

logger = logging.getLogger(__name__)

class InvestmentPackageList(generics.ListAPIView):
    serializer_class = InvestmentPackageSerializer
    queryset = InvestmentPackage.objects.filter(is_active=True)

class UserInvestmentList(generics.ListAPIView):
    serializer_class = UserInvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserInvestment.objects.filter(user=self.request.user)

class CreateInvestment(generics.CreateAPIView):
    serializer_class = InvestmentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_active:
            return Response({"error": "User account is inactive"}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        package_id = serializer.validated_data['package_id']
        try:
            package = InvestmentPackage.objects.get(id=package_id, is_active=True)
        except InvestmentPackage.DoesNotExist:
            return Response({"error": "Invalid or inactive package"}, status=status.HTTP_400_BAD_REQUEST)

        if user.usd_balance < package.tier:
            return Response({"error": "Insufficient USD balance"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                tx = user.withdraw(package.tier, currency='USD')
                tx.transaction_type = 'investment'
                gold_price = GoldPrice.objects.latest('timestamp')
                tx.gold_price_at_time = gold_price.price
                tx.save(update_fields=['transaction_type', 'gold_price_at_time'])

                investment = UserInvestment.objects.create(
                    user=user,
                    package=package,
                    initial_investment=package.tier,
                    current_value=package.tier, 
                    end_date=timezone.now() + timezone.timedelta(days=1050)
                )

                logger.info(f"Investment created for {user.email}: ${package.tier} in {package.get_tier_display()}")
                return Response({
                    "message": f"Invested ${package.tier} in {package.get_tier_display()}",
                    "daily_roi": f"{float(package.daily_roi)*100:.4f}%",
                    "total_return": package.tier * 3,
                    "investment_id": investment.id
                }, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            if e.code == 'service_unavailable':
                return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            Transaction.log_failure(user, 'investment', str(e))
            logger.error(f"Investment failed for {user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MarketDataAPI(APIView):
    def get(self, request):
        prices = GoldPrice.objects.order_by('-timestamp')[:24]
        if not prices:
            return Response({"current_price": 0, "24h_change": 0, "history": []}, status=status.HTTP_200_OK)

        return Response({
            "current_price": prices[0].price,
            "24h_change": prices[0].change_24h,
            "history": [{"price": p.price, "timestamp": p.timestamp, "change": p.change_24h} for p in prices]
        }, status=status.HTTP_200_OK)