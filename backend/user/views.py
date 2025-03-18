from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ValidationError
import logging
from decimal import Decimal

from .models import User, UserProfile, KYCVerification
from .serializers import UserSerializer, UserProfileSerializer, KYCVerificationSerializer, StripeAccountSerializer

logger = logging.getLogger(__name__)

class UserDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"User {request.user.email} updated their details")
            return Response(serializer.data, status=status.HTTP_200_OK)
        logger.error(f"User update failed for {request.user.email}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        profile = request.user.profile
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        profile = request.user.profile
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Profile updated for {request.user.email}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        logger.error(f"Profile update failed for {request.user.email}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class KYCVerificationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            kyc = request.user.kyc_verification
            serializer = KYCVerificationSerializer(kyc)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KYCVerification.DoesNotExist:
            return Response({"detail": "KYC verification not submitted"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        if hasattr(request.user, "kyc_verification"):
            return Response({"detail": "KYC verification already submitted"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = KYCVerificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            logger.info(f"KYC verification submitted for {request.user.email}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f"KYC submission failed for {request.user.email}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            kyc = request.user.kyc_verification
            if kyc.verified_at or kyc.rejection_reason:
                return Response({"detail": "Cannot update verified or rejected KYC"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = KYCVerificationSerializer(kyc, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"KYC updated for {request.user.email}")
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KYCVerification.DoesNotExist:
            return Response({"detail": "KYC verification not found"}, status=status.HTTP_404_NOT_FOUND)

class AdminKYCVerificationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        kycs = KYCVerification.objects.filter(verified_at__isnull=True, rejection_reason='')
        serializer = KYCVerificationSerializer(kycs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        try:
            kyc = KYCVerification.objects.get(user__email=request.data.get("email"))
            serializer = KYCVerificationSerializer(kyc, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(verified_by=request.user)
                logger.info(f"KYC status updated for {kyc.user.email} by {request.user.email}")
                return Response(serializer.data, status=status.HTTP_200_OK)
            logger.error(f"KYC update failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KYCVerification.DoesNotExist:
            return Response({"detail": "KYC verification not found"}, status=status.HTTP_404_NOT_FOUND)

class ListUsersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        status_filter = request.query_params.get('kyc_status', None)
        if status_filter:
            users = users.filter(kyc_status=status_filter.upper())
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WelcomeDashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        welcome_message = f"Welcome, {user.first_name} {user.last_name}!"
        actions = {
            "verification_status": user.verification_status,
            "kyc_status": user.kyc_status,
            "wallet": {
                "usd_balance": user.usd_balance,
                "usxw_balance": user.usxw_balance,
                "total_invested": user.total_invested,
                "total_portfolio_value": user.get_total_portfolio_value()
            },
            "send_verification_otp": {
                "message": "Verify your email to unlock full features.",
                "endpoint": "/auth/otp/send/",
                "method": "POST",
                "payload": {"purpose": "VA"},
                "required": user.verification_status != "verified"
            },
            "submit_kyc": {
                "message": "Submit KYC documents to enable transactions.",
                "endpoint": "/user/me/kyc/",
                "method": "POST",
                "required": user.kyc_status == "UNVERIFIED"
            },
            "update_profile": {
                "message": "Complete your profile.",
                "endpoint": "/user/me/profile/",
                "method": "PUT",
                "required": not user.profile.bio
            },
            "add_stripe_account": {
                "message": "Link your Stripe account for payouts.",
                "endpoint": "/user/me/wallet/stripe-account/",
                "method": "POST",
                "payload": {"stripe_account_id": "<your_stripe_account_id>"},
                "required": not user.stripe_account_id
            }
        }
        return Response({
            "message": welcome_message,
            "user": UserSerializer(user).data,
            "actions": actions
        }, status=status.HTTP_200_OK)

class WalletDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        wallet_data = {
            "usd_balance": user.usd_balance,
            "usxw_balance": user.usxw_balance,
            "total_invested": user.total_invested,
            "total_portfolio_value": user.get_total_portfolio_value(),
            "stripe_customer_id": user.stripe_customer_id,
            "stripe_account_id": user.stripe_account_id,
        }
        return Response(wallet_data, status=status.HTTP_200_OK)

class WalletConversionView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            amount = Decimal(request.data.get("amount", 0))
            tx = user.convert_usd_to_usxw(amount)
            logger.info(f"Converted {amount} USD to USXW for {user.email}")
            return Response({
                "message": f"Successfully converted {amount} USD to USXW",
                "transaction_id": tx.id,
                "new_usd_balance": user.usd_balance,
                "new_usxw_balance": user.usxw_balance
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            logger.error(f"Wallet conversion failed for {user.email}: {str(e)}")
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class WalletStripeAccountView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = StripeAccountSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            stripe_account_id = serializer.validated_data["stripe_account_id"]
            try:
                import stripe
                stripe.Account.retrieve(stripe_account_id)
            except stripe.error.StripeError as e:
                logger.error(f"Invalid Stripe account ID for {user.email}: {str(e)}")
                return Response({"detail": f"Invalid Stripe account ID: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            logger.info(f"Stripe account ID updated for {user.email}")
            return Response({
                "message": "Stripe account ID updated successfully",
                "stripe_account_id": user.stripe_account_id
            }, status=status.HTTP_200_OK)
        logger.error(f"Stripe account update failed for {user.email}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)