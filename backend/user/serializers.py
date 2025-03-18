from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import User, UserProfile, KYCVerification

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model with read-only fields"""
    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "client_id",
            "first_name",
            "last_name",
            "mobile_number",
            "verification_status",
            "kyc_status",
            "document_expiry",
            "country",
            "city",
            "usd_balance",
            "usxw_balance",
            "stripe_customer_id",
            "stripe_account_id", 
            "total_invested",
            "jurisdiction",
            "risk_level",
            "created_at",
            "last_activity",
            "is_active",
        ]
        read_only_fields = [
            "username",
            "client_id",
            "verification_status",
            "kyc_status",
            "document_expiry",
            "usd_balance",
            "usxw_balance",
            "stripe_customer_id",
            "stripe_account_id", 
            "total_invested",
            "created_at",
            "last_activity",
            "is_active",
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile model"""
    class Meta:
        model = UserProfile
        fields = ["avatar", "bio"]

    def validate_avatar(self, value):
        if value.size > 2 * 1024 * 1024:  # 2MB limit
            raise ValidationError("Avatar file size must be less than 2MB.")
        return value

class KYCVerificationSerializer(serializers.ModelSerializer):
    """Serializer for KYCVerification model"""
    class Meta:
        model = KYCVerification
        fields = [
            "document_type",
            "document_front",
            "document_back",
            "verified_at",
            "rejection_reason",
            "next_review_date",
        ]
        read_only_fields = ["verified_at", "rejection_reason", "next_review_date"]

    def validate(self, attrs):
        document_type = attrs.get("document_type")
        document_back = attrs.get("document_back")
        if document_type == "NATIONAL_ID" and not document_back:
            raise ValidationError("National ID requires both front and back images.")
        return attrs

class StripeAccountSerializer(serializers.ModelSerializer):
    """Serializer specifically for updating stripe_account_id"""
    class Meta:
        model = User
        fields = ["stripe_account_id"]