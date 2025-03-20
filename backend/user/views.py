from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ValidationError
import logging
from decimal import Decimal
from django_countries import countries
from .models import User, UserProfile, KYCVerification
from .serializers import UserSerializer, UserProfileSerializer, KYCVerificationSerializer, StripeAccountSerializer
from .kyc_utils import KYCVerifier

logger = logging.getLogger(__name__)


class CountryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        country_list = [
            {"code": code, "name": name} for code, name in countries
        ]
        return Response(country_list, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        logger.debug(f"UserDetailView accessed by {request.user.email}")
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        logger.debug(f"UserDetailView PATCH accessed by {request.user.email} with data: {request.data}")
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"User {request.user.email} updated their details: {serializer.data}")
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
            kyc = serializer.save(user=request.user)
            
            # Automate KYC verification
            try:
                verifier = KYCVerifier()
                doc_path = kyc.document_front.path
                selfie_path = kyc.selfie.path
                
                # Validate document
                result = verifier.validate_document(doc_path, kyc.document_type)
                kyc.verification_result = result
                
                # Verify face match
                verifier.verify_face(doc_path, selfie_path)
                
                # If all pass, mark as verified
                kyc.verified_at = timezone.now()
                kyc.is_auto_verified = True
                kyc.next_review_date = timezone.now().date() + timedelta(days=365)
                kyc.save()
                request.user.update_kyc_status()
                logger.info(f"KYC auto-verified for {request.user.email}")
            except ValidationError as e:
                kyc.rejection_reason = str(e)
                kyc.save()
                request.user.update_kyc_status()
                logger.error(f"KYC failed for {request.user.email}: {str(e)}")
            
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