from django.contrib.auth import authenticate, logout
from django.core.mail import send_mail, EmailMultiAlternatives
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from user.models import User, OTP
from .serializers import (
    MyTokenObtainPairSerializer,
    UserRegistrationSerializer,
    OTPVerificationSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    UserChangePasswordSerializer,
)
import logging

logger = logging.getLogger(__name__)
default_token_generator = PasswordResetTokenGenerator()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response_serializer = UserRegistrationSerializer(user)
            return Response({
                "message": "User registered successfully",
                "user": response_serializer.data
            }, status=status.HTTP_201_CREATED)
        logger.error(f"Registration failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        logger.debug(f"Login attempt with data: {request.data}")
        serializer = self.serializer_class(data=request.data, context={'request': request})
        try:
            serializer.is_valid(raise_exception=True)
            logger.info(f"Login successful for {serializer.validated_data['user']['email']}")
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Login failed: {str(e)}")
            return Response({"detail": str(e) if str(e) else "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Attempt to revoke the token
            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": f"Logout failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        try:
            user.delete()  # This will call the overridden delete method
            logger.info(f"Account and all related data deleted for {user.email}")
            return Response({"message": "Account and all related data deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Account deletion failed for {user.email}: {str(e)}")
            return Response({"detail": "Failed to delete account"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SendOTPView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        purpose = request.data.get("purpose", "VA")
        if purpose not in dict(OTP.PURPOSE_CHOICES):
            return Response({"detail": "Invalid OTP purpose"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            otp = OTP(user=user, purpose=purpose)
            otp.save()
            html_message = render_to_string(
                "otp_email.html",
                {"otp_code": otp.otp_code, "username": user.username, "purpose": dict(OTP.PURPOSE_CHOICES)[purpose]}
            )
            subject = f"Metal Mint Portal | Your OTP for {dict(OTP.PURPOSE_CHOICES)[purpose]}"
            text_message = strip_tags(html_message)
            from_email = "michaelndai997@gmail.com"
            recipient_list = [user.email]
            mail = EmailMultiAlternatives(subject, text_message, from_email, recipient_list)
            mail.attach_alternative(html_message, "text/html")
            mail.send(fail_silently=False)
            logger.info(f"OTP {otp.otp_code} sent to {user.email} for purpose {purpose}")
            return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to send OTP to {user.email}: {str(e)}")
            return Response({"detail": f"Failed to send OTP: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OTPVerificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = OTPVerificationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "OTP verified successfully",
                "verification_status": user.verification_status
            }, status=status.HTTP_200_OK)
        logger.error(f"OTP verification failed for {request.user.email}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pkid))
                reset_url = f"http://localhost:3000/password/reset/confirm/{uid}/{token}/"
                html_message = render_to_string(
                    "password_reset_email.html",
                    {"reset_link": reset_url, "username": user.username}
                )
                subject = "Metal Mint Portal | Reset Your Password"
                text_message = strip_tags(html_message)
                from_email = "michaelndai997@gmail.com"
                recipient_list = [email]
                mail = EmailMultiAlternatives(subject, text_message, from_email, recipient_list)
                mail.attach_alternative(html_message, "text/html")
                mail.send(fail_silently=False)
                logger.info(f"Password reset email sent to {email}")
                return Response({"detail": "Password reset email sent"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                logger.warning(f"Password reset requested for non-existent email: {email}")
                return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        logger.error(f"Password reset request failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token, *args, **kwargs):
        serializer = PasswordResetConfirmSerializer(data=request.data, context={'uidb64': uidb64, 'token': token})
        if serializer.is_valid():
            user = serializer.get_user()
            if user and default_token_generator.check_token(user, token):
                serializer.save()
                logger.info(f"Password reset successful for {user.email}")
                return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
            logger.warning(f"Invalid password reset attempt with uidb64: {uidb64}")
            return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Password changed successfully for {request.user.email}")
            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        logger.error(f"Password change failed for {request.user.email}: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)