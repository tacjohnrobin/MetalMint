# transactions/urls.py
from django.urls import path
from . import views

app_name = 'banking'  # Namespace for URL reversing

urlpatterns = [
    # API Endpoints
    path('deposit/', views.DepositAPI.as_view(), name='deposit'),
    path('withdrawal/', views.WithdrawalAPI.as_view(), name='withdrawal'),
    path('history/', views.TransactionHistoryAPI.as_view(), name='transaction_history'),
    
    # Webhook Endpoint
    path('webhook/stripe/', views.stripe_webhook, name='stripe_webhook'),
]