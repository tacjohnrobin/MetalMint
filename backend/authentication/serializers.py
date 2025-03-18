from typing import Dict, Any
from django.db import transaction
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.utils import timezone
import logging
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from user.models import User, OTP

logger = logging.getLogger(__name__)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom Token Obtain Pair Serializer for JWT authentication"""
    @classmethod
    def get_token(cls, user: User) -> AccessToken:
        """
        Generate an access token for the authenticated user
        
        Args:
            user (User): The authenticated user instance
            
        Returns:
            AccessToken: JWT access token
        """
        token = super().get_token(user)
        return token
    
    @staticmethod
    def revoke_token(refresh_token: str) -> bool:
        """
        Revoke a refresh token by adding it to blacklist
        
        Args:
            refresh_token (str): The refresh token to revoke
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return True
        except Exception as e:
            logger.error(f"Token revocation failed: {str(e)}")
            return False

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration and account creation"""
    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "mobile_number",
            "password",
            "client_id",
            "username",
            "stripe_customer_id",
            "kyc_status",
            "document_expiry"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "client_id": {"read_only": True},
            "username": {"read_only": True},
            "stripe_customer_id": {"read_only": True},
            "kyc_status": {"read_only": True},
            "document_expiry": {"read_only": True}
        }

    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    mobile_number = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate registration data for uniqueness and format
        
        Args:
            attrs (Dict[str, Any]): Input data to validate
            
        Raises:
            serializers.ValidationError: If validation fails
        """
        email = attrs.get("email")
        mobile_number = attrs.get("mobile_number")

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already registered.")
        
        if User.objects.filter(mobile_number=mobile_number).exists():
            raise serializers.ValidationError("Mobile number already exists.")

        return attrs

    @transaction.atomic
    def create(self, validated_data: Dict[str, Any]) -> User:
        """
        Create a new user with validated data
        
        Args:
            validated_data (Dict[str, Any]): Validated registration data
            
        Returns:
            User: Created user instance
        """
        user = User(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            mobile_number=validated_data["mobile_number"]
        )
        user.set_password(validated_data["password"])
        
        # Save will trigger client_id, username generation, and stripe_customer_id creation
        user.save()

        email_sent = self._send_welcome_email(user.email, user.username, user.client_id)
        if not email_sent:
            logger.error(f"Failed to send welcome email to {user.email}")
        else:
            logger.info(f"Welcome email sent to {user.email}")

        return user

    def _send_welcome_email(self, email: str, username: str, client_id: str) -> bool:
        """
        Send welcome email to newly registered user
        
        Args:
            email (str): User's email address
            username (str): User's username
            client_id (str): User's client ID
            
        Returns:
            bool: Success status of email sending
        """
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
    """Serializer for OTP verification"""
    otp_code = serializers.CharField(max_length=10, required=True)
    purpose = serializers.ChoiceField(
        choices=OTP.PURPOSE_CHOICES,
        required=True,
        help_text="Purpose of the OTP (VA=Verification, PR=Password Reset, 2F=Two-Factor)"
    )

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate OTP code and purpose
        
        Args:
            attrs (Dict[str, Any]): OTP code and purpose
            
        Raises:
            serializers.ValidationError: If OTP is invalid, expired, or already used
        """
        user = self.context['request'].user
        otp_code = attrs.get('otp_code')
        purpose = attrs.get('purpose')

        try:
            otp = OTP.objects.get(
                user=user,
                otp_code=otp_code,
                purpose=purpose,
                is_verified=False
            )
            
            if otp.is_expired:
                raise serializers.ValidationError({
                    "otp_code": "This OTP has expired"
                })
                
        except OTP.DoesNotExist:
            raise serializers.ValidationError({
                "otp_code": "Invalid OTP code or purpose"
            })

        attrs['otp_instance'] = otp
        return attrs

    def save(self, **kwargs) -> User:
        """
        Verify OTP and update user status
        
        Returns:
            User: Updated user instance
        """
        otp = self.validated_data['otp_instance']
        otp.is_verified = True
        otp.save()
        
        return otp.user

class PasswordResetRequestSerializer(serializers.Serializer):
    """Serializer for password reset requests"""
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for confirming password reset"""
    password = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(write_only=True, required=True)

    def validate_password(self, value: str) -> str:
        """
        Validate new password meets requirements
        
        Args:
            value (str): New password
            
        Raises:
            serializers.ValidationError: If password validation fails
        """
        user = self.get_user()
        if user:
            try:
                password_validation.validate_password(value, user)
            except ValidationError as e:
                raise serializers.ValidationError(e.messages)
        return value

    def get_user(self) -> User:
        """
        Retrieve user from encoded UID
        
        Returns:
            User: User instance or None if invalid
        """
        try:
            uid = force_str(urlsafe_base64_decode(self.context["uidb64"]))
            return User.objects.get(pkid=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return None

    def save(self) -> User:
        """
        Save new password for user
        
        Returns:
            User: Updated user instance
        """
        user = self.get_user()
        if user:
            user.set_password(self.validated_data["password"])
            user.save()
        return user

class UserChangePasswordSerializer(serializers.Serializer):
    """Serializer for changing user password"""
    password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate new password
        
        Args:
            attrs (Dict[str, Any]): Password data
            
        Raises:
            serializers.ValidationError: If password validation fails
        """
        password = attrs.get('password')
        user = self.context.get('user')
        
        try:
            validate_password(password, user)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
            
        return attrs

    def save(self) -> User:
        """
        Update user's password
        
        Returns:
            User: Updated user instance
        """
        user = self.context.get('user')
        user.set_password(self.validated_data['password'])
        user.save()
        return user