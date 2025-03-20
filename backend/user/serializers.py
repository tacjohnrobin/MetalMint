from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import User, UserProfile, KYCVerification

from django_countries import countries

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model with read-only fields"""
    
    country_display = serializers.SerializerMethodField()
    country = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email", "username", "client_id", "first_name", "last_name", "mobile_number",
            "verification_status", "kyc_status", "document_expiry", "country", "country_display", "city",
            "usd_balance", "usxw_balance", "stripe_customer_id", "stripe_account_id",
            "total_invested", "jurisdiction", "risk_level", "created_at", "last_activity",
            "is_active"
        ]
        read_only_fields = [
            "username", "client_id", "verification_status", "kyc_status", "document_expiry",
            "usd_balance", "usxw_balance", "stripe_customer_id", "stripe_account_id",
            "total_invested", "created_at", "last_activity", "is_active"
        ]

    def get_country_display(self, obj):
        """Serialize CountryField to a JSON-compatible format"""
        return {"code": obj.country.code, "name": obj.country.name}

    def to_internal_value(self, data):
        """Handle country input as either code or name"""
        if "country" in data:
            country_input = data["country"]
            if isinstance(country_input, str):
                # Check if it's a valid code
                if country_input in countries.countries:
                    data["country"] = country_input
                else:
                    # Try to match by name
                    for code, name in countries:
                        if name.lower() == country_input.lower():
                            data["country"] = code
                            break
                    else:
                        raise serializers.ValidationError({"country": f"'{country_input}' is not a valid country code or name."})
        return super().to_internal_value(data)
    
    def validate_country(self, value):
        """
        Ensure the country is valid
        """
        if value not in countries.countries:
            raise serializers.ValidationError(f"'{value}' is not a valid country code.")
        return value

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
    """Serializer for KYC Verification"""

    class Meta:
        model = KYCVerification
        fields = [
            "document_type", "document_front", "document_back", "selfie",
            "verified_at", "rejection_reason", "next_review_date",
            "verification_result", "is_auto_verified"
        ]
        read_only_fields = ["verified_at", "rejection_reason", "next_review_date", "verification_result", "is_auto_verified"]

    def validate(self, attrs):
        document_type = attrs.get("document_type")
        document_back = attrs.get("document_back")
        selfie = attrs.get("selfie")
        if document_type == "NATIONAL_ID" and not document_back:
            raise ValidationError("National ID requires both front and back images.")
        if not selfie:
            raise ValidationError("Selfie is required for KYC verification.")
        return attrs

class StripeAccountSerializer(serializers.ModelSerializer):
    """Serializer specifically for updating stripe_account_id"""

    class Meta:
        model = User
        fields = ["stripe_account_id"]