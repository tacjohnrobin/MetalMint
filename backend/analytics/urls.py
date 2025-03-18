from django.urls import path
from .views import (
    PortfolioAPI,
    EarningsReportAPI,
    TransactionTrendsAPI,
    PortfolioHistoryAPI,
    SystemOverviewAPI,
    UserActivityAPI,
)

app_name = 'analytics'

urlpatterns = [
    # User Analytics
    path('portfolio/', PortfolioAPI.as_view(), name='portfolio'),
    path('earnings/', EarningsReportAPI.as_view(), name='earnings'),
    path('trends/', TransactionTrendsAPI.as_view(), name='transaction-trends'),
    path('history/', PortfolioHistoryAPI.as_view(), name='portfolio-history'),
    
    # Admin Analytics
    path('admin/overview/', SystemOverviewAPI.as_view(), name='system-overview'),
    path('admin/user-activity/', UserActivityAPI.as_view(), name='user-activity'),
]