from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .services import PortfolioAnalyzer
from banking.models import Transaction
from user.models import User
from .models import PortfolioSnapshot
from django.db.models import Sum, Max, Count, Avg
from django.utils import timezone
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

class PortfolioAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            analyzer = PortfolioAnalyzer(request.user)
            report = analyzer.generate_report()
            analyzer.generate_snapshot()
            return Response(report, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Portfolio report failed for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            "currency": "USXW"  # All payouts are in USXW per investments module
        }, status=status.HTTP_200_OK)

class TransactionTrendsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            days = int(request.query_params.get('days', 30))
            if days <= 0:
                return Response({"error": "Days must be positive"}, status=status.HTTP_400_BAD_REQUEST)
            start_date = timezone.now() - timedelta(days=days)

            transactions = Transaction.objects.filter(
                user=request.user,
                created_at__gte=start_date
            ).values('transaction_type', 'currency').annotate(
                total_amount=Sum('amount'),
                count=Count('id'),
                avg_amount=Avg('amount')
            )

            # Structure response to reflect currency separation
            trends = {}
            for tx in transactions:
                key = f"{tx['transaction_type']}_{tx['currency'].lower()}"
                trends[key] = {
                    "total_amount": tx['total_amount'] or 0,
                    "count": tx['count'],
                    "avg_amount": tx['avg_amount'] or 0
                }

            return Response({
                "trends": trends,
                "period_days": days
            }, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"error": "Invalid days parameter"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Transaction trends failed for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PortfolioHistoryAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            days = int(request.query_params.get('days', 30))
            if days <= 0:
                return Response({"error": "Days must be positive"}, status=status.HTTP_400_BAD_REQUEST)
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
        except ValueError:
            return Response({"error": "Invalid days parameter"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Portfolio history failed for {request.user.email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SystemOverviewAPI(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        try:
            users = User.objects.all()
            transactions = Transaction.objects.all()
            snapshots = PortfolioSnapshot.objects.all()

            # Split transaction volume by currency
            transaction_volume_usd = transactions.filter(currency='USD').aggregate(total=Sum('amount'))['total'] or 0
            transaction_volume_usxw = transactions.filter(currency='USXW').aggregate(total=Sum('amount'))['total'] or 0

            overview = {
                "total_users": users.count(),
                "kyc_status": {
                    status: users.filter(kyc_status=status).count()
                    for status in ['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED']
                },
                "total_transactions": transactions.count(),
                "transaction_volume": {
                    "usd": transaction_volume_usd,
                    "usxw": transaction_volume_usxw
                },
                "average_portfolio_value": snapshots.aggregate(avg=Avg('total_value'))['avg'] or 0,
                "total_invested_system": snapshots.aggregate(total=Sum('total_invested'))['total'] or 0,
            }
            return Response(overview, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"System overview failed: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

            # Split total amount by currency
            total_usd = transactions.filter(currency='USD').aggregate(total=Sum('amount'))['total'] or 0
            total_usxw = transactions.filter(currency='USXW').aggregate(total=Sum('amount'))['total'] or 0

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
                    "total_amount": {
                        "usd": total_usd,
                        "usxw": total_usxw
                    },
                    "by_type": list(
                        transactions.values('transaction_type', 'currency').annotate(
                            count=Count('id'),
                            total=Sum('amount')
                        ).order_by('transaction_type', 'currency')
                    )
                }
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"User activity report failed for {email}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)