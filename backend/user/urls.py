from django.urls import path
from .views import (
    UserDetailView,
    UserProfileView,
    KYCVerificationView,
    AdminKYCVerificationView,
    ListUsersView,
    WelcomeDashboardView,
    WalletDetailView,
    WalletConversionView,
    WalletStripeAccountView,
)

app_name = 'user'

urlpatterns = [
    # User Details
    path('me/', UserDetailView.as_view(), name='user-detail'),
    
    # User Profile
    path('me/profile/', UserProfileView.as_view(), name='user-profile'),
    
    # KYC Verification (User)
    path('me/kyc/', KYCVerificationView.as_view(), name='kyc-verification'),
    
    # KYC Verification (Admin)
    path('admin/kyc/', AdminKYCVerificationView.as_view(), name='admin-kyc-verification'),
    
    # List All Users (Admin)
    path('admin/users/', ListUsersView.as_view(), name='list-users'),
    
    # Welcome Dashboard
    path('me/dashboard/', WelcomeDashboardView.as_view(), name='welcome-dashboard'),
    
    # Wallet Views
    path('me/wallet/', WalletDetailView.as_view(), name='wallet-detail'),
    path('me/wallet/convert/', WalletConversionView.as_view(), name='wallet-conversion'),
    path('me/wallet/stripe-account/', WalletStripeAccountView.as_view(), name='wallet-stripe-account'),
]