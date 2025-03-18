from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .services import PortfolioAnalyzer
from banking.models import Transaction
from user.models import User
from .models import PortfolioSnapshot
from django.db.models import Sum, Max, Count, Avg, Q
from django.utils import timezone
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

class PortfolioAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        analyzer = PortfolioAnalyzer(request.user)
        report = analyzer.generate_report()
        analyzer.generate_snapshot()  # Save snapshot for historical tracking
        return Response(report, status=status.HTTP_200_OK)

class EarningsReportAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        earnings = Transaction.objects.filter(
            user=request.user,
            transaction_type='payout',
            status='completed'
        ).aggregate(
            total_earned=Sum('amount'),
            last_payout=Max('completed_at'),
            payout_count=Count('id')
        )
        return Response({
            "total_earnings": earnings['total_earned'] or 0,
            "last_payout": earnings['last_payout'],
            "payout_count": earnings['payout_count'] or 0,
            "currency": "USXW"
        }, status=status.HTTP_200_OK)

class TransactionTrendsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        days = int(request.query_params.get('days', 30))  # Default to 30 days
        start_date = timezone.now() - timedelta(days=days)
        
        transactions = Transaction.objects.filter(
            user=request.user,
            created_at__gte=start_date
        ).values('transaction_type').annotate(
            total_amount=Sum('amount'),
            count=Count('id'),
            avg_amount=Avg('amount')
        )
        
        return Response({
            "trends": {
                tx['transaction_type']: {
                    "total_amount": tx['total_amount'],
                    "count": tx['count'],
                    "avg_amount": tx['avg_amount']
                } for tx in transactions
            },
            "period_days": days
        }, status=status.HTTP_200_OK)

class PortfolioHistoryAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        days = int(request.query_params.get('days', 30))  # Default to 30 days
        start_date = timezone.now() - timedelta(days=days)
        
        snapshots = PortfolioSnapshot.objects.filter(
            user=request.user,
            timestamp__gte=start_date
        ).order_by('timestamp')
        
        return Response({
            "history": [
                {
                    "timestamp": snap.timestamp,
                    "total_value": snap.total_value,
                    "gold_price": snap.gold_price,
                    "usd_balance": snap.usd_balance,
                    "usxw_balance": snap.usxw_balance,
                    "total_invested": snap.total_invested,
                    "daily_change": snap.daily_change
                } for snap in snapshots
            ],
            "period_days": days
        }, status=status.HTTP_200_OK)

# Admin Views
class SystemOverviewAPI(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        transactions = Transaction.objects.all()
        snapshots = PortfolioSnapshot.objects.all()
        
        overview = {
            "total_users": users.count(),
            "kyc_status": {
                status: users.filter(kyc_status=status).count()
                for status in ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED']
            },
            "total_transactions": transactions.count(),
            "transaction_volume": transactions.aggregate(total=Sum('amount'))['total'] or 0,
            "average_portfolio_value": snapshots.aggregate(avg=Avg('total_value'))['avg'] or 0,
            "total_invested_system": snapshots.aggregate(total=Sum('total_invested'))['total'] or 0,
        }
        return Response(overview, status=status.HTTP_200_OK)

class UserActivityAPI(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        email = request.query_params.get('email')
        if not email:
            return Response({"error": "Email parameter required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            analyzer = PortfolioAnalyzer(user)
            transactions = Transaction.objects.filter(user=user)
            
            return Response({
                "user": {
                    "email": user.email,
                    "kyc_status": user.kyc_status,
                    "verification_status": user.verification_status,
                    "last_activity": user.last_activity
                },
                "portfolio": analyzer.generate_report(),
                "transactions": {
                    "total_count": transactions.count(),
                    "total_amount": transactions.aggregate(total=Sum('amount'))['total'] or 0,
                    "by_type": transactions.values('transaction_type').annotate(
                        count=Count('id'),
                        total=Sum('amount')
                    )
                }
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)