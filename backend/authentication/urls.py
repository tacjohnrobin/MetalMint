from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    DeleteAccountView,
    SendOTPView,
    OTPVerificationView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    ChangePasswordView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('account/delete/', DeleteAccountView.as_view(), name='delete_account'),
    path('otp/send/', SendOTPView.as_view(), name='send_otp'),
    path('otp/verify/', OTPVerificationView.as_view(), name='otp_verify'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password/reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password/change/', ChangePasswordView.as_view(), name='change_password'),
]