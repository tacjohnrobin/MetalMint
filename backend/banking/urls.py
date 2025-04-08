# transactions/urls.py
from django.urls import path
from . import views

app_name = 'banking'  # Namespace for URL reversing

urlpatterns = [
    # API Endpoints
    path('deposit/', views.DepositAPI.as_view(), name='deposit'),
    path('withdrawal/', views.WithdrawalAPI.as_view(), name='withdrawal'),
    path('transactions/', views.TransactionListView.as_view(), name='transaction_list'),
    path('convert/', views.ConversionAPI.as_view(), name='convert_currency'),
    path('transactions/detail/', views.TransactionDetailView.as_view(), name='transaction_detail'),
    path('webhook/deposit/', views.deposit_webhook, name='deposit_webhook'),
    path('webhook/withdrawal/', views.withdrawal_webhook, name='withdrawal_webhook'),
]