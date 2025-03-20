from typing import Dict, Any
from django.db import transaction
from django.contrib.auth import password_validation, authenticate
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.utils import timezone
import logging
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from user.models import User, OTP
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User) -> AccessToken:
        token = super().get_token(user)
        token['user_id'] = str(user.pkid)
        token['email'] = user.email
        return token

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        email = attrs.get("email")
        password = attrs.get("password")
        user = authenticate(request=self.context.get('request'), email=email, password=password)
        if not user:
            raise serializers.ValidationError({"detail": "Invalid email or password"})
        if not user.is_active:
            raise serializers.ValidationError({"detail": "User account is disabled"})
        self.user = user
        refresh = self.get_token(self.user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'pkid': user.pkid,
                'email': user.email,
                'client_id': user.client_id,
                'username': user.username
            }
        }
        return data

    @staticmethod
    def revoke_token(refresh_token: str) -> bool:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return True
        except TokenError as e:
            if str(e) == "Token is blacklisted":
                logger.info(f"Token is already blacklisted: {refresh_token[:20]}...")
                return True
            logger.error(f"Token revocation failed: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error during token revocation: {str(e)}")
            return False

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email", "first_name", "last_name", "mobile_number", "password",
            "client_id", "username", "stripe_customer_id", "kyc_status", "document_expiry", "pkid"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "client_id": {"read_only": True},
            "username": {"read_only": True},
            "stripe_customer_id": {"read_only": True},
            "kyc_status": {"read_only": True},
            "document_expiry": {"read_only": True},
            "pkid": {"read_only": True},
        }

    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    mobile_number = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        email = attrs.get("email")
        mobile_number = attrs.get("mobile_number")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email is already registered"})
        if User.objects.filter(mobile_number=mobile_number).exists():
            raise serializers.ValidationError({"mobile_number": "Mobile number already exists"})
        return attrs

    @transaction.atomic
    def create(self, validated_data: Dict[str, Any]) -> User:
        user = User(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            mobile_number=validated_data["mobile_number"]
        )
        user.set_password(validated_data["password"])
        user.save()
        email_sent = self._send_welcome_email(user.email, user.username, user.client_id)
        if not email_sent:
            logger.error(f"Failed to send welcome email to {user.email}")
        return user

    def _send_welcome_email(self, email: str, username: str, client_id: str) -> bool:
        try:
            send_mail(
                subject="Welcome to Metal Mint Gold Investing Yields Marketplace",
                message=f"Dear {username},\n\nWe're excited to have you on board! Your client ID is {client_id}.",
                from_email="michaelndai997@gmail.com",
                recipient_list=[email],
                fail_silently=False,
            )
            return True
        except Exception as e:
            logger.error(f"Error sending welcome email: {str(e)}")
            return False

class OTPVerificationSerializer(serializers.Serializer):
    otp_code = serializers.CharField(max_length=10, required=True)
    purpose = serializers.ChoiceField(choices=OTP.PURPOSE_CHOICES, required=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        user = self.context['request'].user
        otp_code = attrs.get('otp_code')
        purpose = attrs.get('purpose')
        try:
            otp = OTP.objects.get(user=user, otp_code=otp_code, purpose=purpose, is_verified=False)
            if otp.is_expired:
                raise serializers.ValidationError({"otp_code": "This OTP has expired"})
        except OTP.DoesNotExist:
            raise serializers.ValidationError({"otp_code": "Invalid OTP code or purpose"})
        attrs['otp_instance'] = otp
        return attrs

    def save(self, **kwargs) -> User:
        otp = self.validated_data['otp_instance']
        otp.is_verified = True
        otp.save()
        return otp.user

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(write_only=True, required=True)

    def validate_password(self, value: str) -> str:
        user = self.get_user()
        if user:
            try:
                password_validation.validate_password(value, user)
            except ValidationError as e:
                raise serializers.ValidationError(e.messages)
        return value

    def get_user(self) -> User:
        try:
            uid = force_str(urlsafe_base64_decode(self.context["uidb64"]))
            return User.objects.get(pkid=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return None

    def save(self) -> User:
        user = self.get_user()
        if user:
            user.set_password(self.validated_data["password"])
            user.save()
        return user

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        password = attrs.get('password')
        user = self.context.get('user')
        try:
            password_validation.validate_password(password, user)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return attrs

    def save(self) -> User:
        user = self.context.get('user')
        user.set_password(self.validated_data['password'])
        user.save()
        return user