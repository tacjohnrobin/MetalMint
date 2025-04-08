from django.urls import path
from .views import (
    CountryListView, UserDetailView, UserProfileView, KYCVerificationView,
    ListUsersView, WelcomeDashboardView, WalletDetailView, WalletStripeAccountView,
    StripeExpressConnectAPI
)

urlpatterns = [
    path('countries/', CountryListView.as_view(), name='country_list'),
    path('me/', UserDetailView.as_view(), name='user_detail'),
    path('me/profile/', UserProfileView.as_view(), name='user_profile'),
    path('me/kyc/', KYCVerificationView.as_view(), name='kyc_verification'),
    path('list/', ListUsersView.as_view(), name='list_users'),
    path('me/dashboard/', WelcomeDashboardView.as_view(), name='welcome_dashboard'),
    path('me/wallet/', WalletDetailView.as_view(), name='wallet_detail'),
    path('me/wallet/stripe-account/', WalletStripeAccountView.as_view(), name='wallet_stripe_account'),
    path('me/stripe/connect/', StripeExpressConnectAPI.as_view(), name='stripe_express_connect'),
]