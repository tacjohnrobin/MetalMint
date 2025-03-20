import secrets
from datetime import timedelta
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator, validate_email, FileExtensionValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
from django_countries.fields import CountryField
from django.db import transaction
from encrypted_model_fields.fields import EncryptedCharField
from PIL import Image
from io import BytesIO
import logging
from django.db.models.signals import post_save
from django.dispatch import receiver
import phonenumbers
from .managers import UserManager


logger = logging.getLogger(__name__)

def generate_hex_code(length=6):
    """Generate cryptographically secure hexadecimal string"""
    return secrets.token_hex(length // 2 + 1)[:length].lower()

def validate_phone_number(value):
    try:
        # Parse the phone number
        parsed_number = phonenumbers.parse(value, None)
        # Check if it's a valid number
        if not phonenumbers.is_valid_number(parsed_number):
            raise ValidationError(_("Invalid phone number."))
    except phonenumbers.NumberParseException:
        raise ValidationError(_("Invalid phone number format."))
    

class User(AbstractBaseUser, PermissionsMixin):
    # Authentication & Identification
    email = models.EmailField(_("email address"), unique=True, db_index=True, validators=[validate_email])
    client_id = models.CharField(_("client ID"), max_length=20, unique=True, editable=False)
    username = models.CharField(_("username"), max_length=30, unique=True, editable=False, db_index=True)
    pkid = models.BigAutoField(primary_key=True, editable=False)

    # Verification Status
    VERIFICATION_STATUS = (
        ('unverified', 'Unverified'),
        ('pending', 'Pending'),
        ('verified', 'Verified')  
    )
    verification_status = models.CharField(
        _("verification status"), 
        max_length=20, 
        choices=VERIFICATION_STATUS, 
        default='unverified'
    )

    # Personal Information
    first_name = models.CharField(_("First Name"), max_length=255)
    last_name = models.CharField(_("Last Name"), max_length=255)
    date_of_birth = models.DateField(_("Date of Birth"), blank=True, null=True)

    # Contact Information
    mobile_number = models.CharField(
        _("mobile number"),
        max_length=20,
        unique=True,
        validators=[validate_phone_number],
        blank=True
    )
    country = CountryField(
        _("country"),
        default='US',  
        blank=False,   
        null=False   
    )    
    city = models.CharField(_("city"), max_length=255, blank=True, null=True)

    # Wallet Information
    usd_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    usxw_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    stripe_customer_id = EncryptedCharField(max_length=255, blank=True, unique=True)
    stripe_account_id = EncryptedCharField(max_length=255, blank=True, unique=True)
    total_invested = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    
    # Compliance & KYC
    KYC_STATUS = (
        ('UNVERIFIED', 'Unverified'),
        ('PENDING', 'Pending Verification'),
        ('VERIFIED', 'Verified'),
        ('REJECTED', 'Rejected')
    )
    kyc_status = models.CharField(
        _("KYC Status"), 
        max_length=20, 
        choices=KYC_STATUS, 
        default='UNVERIFIED'
    )
    document_expiry = models.DateField(_("Document Expiry"), null=True, blank=True)
    
    JURISDICTIONS = (
        ('US', 'United States'),
        ('EU', 'European Union'),
        ('SG', 'Singapore'),
        ('AE', 'United Arab Emirates')
    )
    jurisdiction = models.CharField(
        _("Jurisdiction"), 
        max_length=50, 
        choices=JURISDICTIONS, 
        default='US'
    )

    RISK_LEVELS = (
        ('LOW', 'Low'),
        ('MED', 'Medium'),
        ('HIGH', 'High')
    )
    risk_level = models.CharField(
        _("Risk Level"), 
        max_length=10, 
        choices=RISK_LEVELS, 
        default='MED'
    )

    # Audit & Tracking
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    last_activity = models.DateTimeField(_("Last Activity"), auto_now=True)
    terms_accepted = models.BooleanField(_("Terms Accepted"), default=False)

    # Account Status
    is_active = models.BooleanField(_("Active"), default=True)
    is_staff = models.BooleanField(_("Staff Status"), default=False)
    is_deleted = models.BooleanField(_("Deleted Status"), default=False)
    date_joined = models.DateTimeField(_("Date Joined"), auto_now_add=True)
    last_modified = models.DateTimeField(_("Last Modified"), auto_now=True)

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        indexes = [
            models.Index(fields=['email', 'client_id']),
            models.Index(fields=['verification_status', 'is_active'])
        ] 

    def __str__(self):
        return f"{self.email} ({self.client_id})"
    
    def __str__(self):
        return f"{self.city}, {self.country.name if self.country else 'No Country'}"

    def save(self, *args, **kwargs):
        # Ensure the mobile number is formatted correctly
        if self.mobile_number:
            try:
                parsed_number = phonenumbers.parse(self.mobile_number, None)
                self.mobile_number = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164)
            except phonenumbers.NumberParseException:
                raise ValidationError(_("Invalid phone number format."))
        super().save(*args, **kwargs)


    def save(self, *args, **kwargs):
        self.full_clean()
        with transaction.atomic():
            if not self.client_id:
                self.generate_client_id()
            if not self.username:
                self.generate_unique_username()
            super().save(*args, **kwargs)
            if not self.stripe_customer_id and self.pk:
                self.create_stripe_customer()

    # Authentication Tracking

    def generate_client_id(self):
        with transaction.atomic():
            last_user = User.objects.select_for_update().order_by('-pkid').first()
            sequence = (last_user.pkid + 1) if last_user else 1001
            self.client_id = f"MM-{sequence:04d}-{generate_hex_code(6)}"

    def generate_unique_username(self, max_retries=5):
        base = self.email.split('@')[0][:8].lower()
        suffix = self.client_id.split('-')[-1]

        for attempt in range(max_retries + 1):
            username = f"{base}_{suffix}"
            if attempt > 0:
                username += f"_{secrets.token_hex(2)}"
            if not User.objects.filter(username=username).exists():
                self.username = username[:30]
                return
        raise ValidationError(_("Failed to generate unique username after %(retries)s attempts") % {'retries': max_retries})

    def create_stripe_customer(self):
        import stripe
        from stripe.error import StripeError

        if self.stripe_customer_id:
            logger.info(f"Stripe customer ID already exists for {self.email}")
            return

        try:
            with transaction.atomic():
                customer = stripe.Customer.create(
                    email=self.email,
                    phone=self.mobile_number,
                    metadata={
                        'user_id': str(self.pkid),
                        'jurisdiction': self.jurisdiction 
                    }
                )
                self.stripe_customer_id = customer.id
                self.save(update_fields=['stripe_customer_id'])
                logger.info(f"Stripe customer {customer.id} created for {self.email}")
        except StripeError as e:
            logger.error(f"Failed to create Stripe customer for {self.email}: {str(e)}")
            raise ValidationError(f"Payment profile creation failed: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error creating Stripe customer for {self.email}: {str(e)}")
            raise

    # Kyc Verification
    def update_kyc_status(self):
        try:
            kyc = self.kyc_verification
            if kyc.is_auto_verified and kyc.verified_at and not kyc.rejection_reason:
                self.kyc_status = 'VERIFIED'
                self.document_expiry = kyc.next_review_date or (timezone.now().date() + timedelta(days=365))
            elif kyc.rejection_reason:
                self.kyc_status = 'REJECTED'
            elif kyc.pk:
                self.kyc_status = 'PENDING'
            else:
                self.kyc_status = 'UNVERIFIED'
            self.save(update_fields=['kyc_status', 'document_expiry'])
        except KYCVerification.DoesNotExist:
            self.kyc_status = 'UNVERIFIED'
            self.save(update_fields=['kyc_status'])

    def is_kyc_valid(self):
        self.update_kyc_status()
        return (
            self.kyc_status == 'VERIFIED' and 
            self.document_expiry and 
            self.document_expiry > timezone.now().date()
        )

    # Account Deletion
    def delete(self, *args, **kwargs):
        # Delete related objects explicitly if needed
        if hasattr(self, 'profile'):
            self.profile.delete()
        
        if hasattr(self, 'kyc_verification'):
            self.kyc_verification.delete()

        if hasattr(self, 'otps'):
            self.otps.all().delete()

        # Call the superclass delete method
        super().delete(*args, **kwargs)


    # Financial Methods & Setup
    def deposit(self, amount, currency='USD', stripe_payment_id=None, status='completed'):
        from banking.models import Transaction
        from investments.models import GoldPrice
        
        with transaction.atomic():
            if amount <= 0:
                raise ValidationError(_("Deposit amount must be positive"))
            if currency == 'USD':
                self.usd_balance += amount
            elif currency == 'USXW':
                self.usxw_balance += amount
            else:
                raise ValidationError(_("Unsupported currency"))
            
            self.save(update_fields=['usd_balance', 'usxw_balance'])

            try:
                gold_price = GoldPrice.objects.latest('timestamp').price
            except GoldPrice.DoesNotExist:
                gold_price = 0

            tx = Transaction.objects.create(
                user=self,
                amount=amount,
                currency=currency,
                transaction_type='deposit',
                status=status,
                stripe_payment_id=stripe_payment_id or '',
                gold_price_at_time=gold_price
            )
            if status == 'completed':
                tx.completed_at = timezone.now()
                tx.save(update_fields=['completed_at'])
            logger.info(f"Deposit of {amount} {currency} ({status}) for {self.email}")
            return tx

    def withdraw(self, amount, currency='USD', status='completed'):
        from banking.models import Transaction
        from investments.models import GoldPrice

        with transaction.atomic():
            if amount <= 0:
                raise ValidationError(_("Withdrawal amount must be positive"))
            
            if currency == 'USD' and self.usd_balance >= amount:
                self.usd_balance -= amount
            elif currency == 'USXW' and self.usxw_balance >= amount:
                self.usxw_balance -= amount
            else:
                raise ValidationError(_("Insufficient balance or unsupported currency"))
            
            self.save(update_fields=['usd_balance', 'usxw_balance'])

            try:
                gold_price = GoldPrice.objects.latest('timestamp').price
            except GoldPrice.DoesNotExist:
                gold_price = 0

            tx = Transaction.objects.create(
                user=self,
                amount=amount,
                currency=currency,
                transaction_type='withdrawal',
                status=status,
                gold_price_at_time=gold_price
            )
            if status == 'completed':
                tx.completed_at = timezone.now()
                tx.save(update_fields=['completed_at'])
            logger.info(f"Withdrawal of {amount} {currency} ({status}) for {self.email}")
            return tx

    def convert_usd_to_usxw(self, amount):
        from banking.models import Transaction
        from investments.models import GoldPrice

        with transaction.atomic():
            if amount <= 0:
                raise ValidationError(_("Conversion amount must be positive"))
            if self.usd_balance < amount:
                raise ValidationError(_("Insufficient USD balance"))

            self.usd_balance -= amount
            self.usxw_balance += amount
            self.save(update_fields=['usd_balance', 'usxw_balance'])

            try:
                gold_price = GoldPrice.objects.latest('timestamp').price
            except GoldPrice.DoesNotExist:
                gold_price = 0

            tx = Transaction.objects.create(
                user=self,
                amount=amount,
                currency='USD',
                transaction_type='conversion',
                status='completed',
                gold_price_at_time=gold_price
            )
            logger.info(f"Converted {amount} USD to USXW for {self.email}")
            return tx

    def get_total_portfolio_value(self):
        from banking.models import Transaction
        from investments.models import GoldPrice, UserInvestment
        
        try:
            latest_gold_price = GoldPrice.objects.latest('timestamp').price
        except GoldPrice.DoesNotExist:
            latest_gold_price = 0
        
        investments = UserInvestment.objects.filter(user=self, is_active=True)
        investments_value = sum(investment.current_value for investment in investments)
            

        return self.usd_balance + (self.usxw_balance * latest_gold_price) + investments_value

    @property
    def is_verified(self):
        return self.verification_status == 'verified'

    def clean(self):
        super().clean()
        if self.date_of_birth and self.date_of_birth > timezone.now().date():
            raise ValidationError(_("Date of birth cannot be in the future"))
        if self.mobile_number and not self.mobile_number.startswith('+'):
            raise ValidationError(_("Mobile number must include country code"))
        if self.usd_balance < 0 or self.usxw_balance < 0:
            raise ValidationError(_("Account balances cannot be negative"))

class OTP(models.Model):
    """One-Time Password model for user verification"""
    PURPOSE_CHOICES = (
        ('VA', 'Verification'),
        ('PR', 'Password Reset'),
        ('2F', 'Two-Factor Auth')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otps')
    otp_code = models.CharField(_("OTP Code"), max_length=10, editable=False)
    purpose = models.CharField(_("Purpose"), max_length=3, choices=PURPOSE_CHOICES, default='VA')
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    expires_at = models.DateTimeField(_("Expires At"))
    is_verified = models.BooleanField(_("Verified"), default=False)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'purpose', 'expires_at'])
        ]

    def __str__(self):
        return f"{self.get_purpose_display()} OTP for {self.user}"

    def save(self, *args, **kwargs):
        if not self.pk:
            self.generate_code()
            self.invalidate_previous()
        super().save(*args, **kwargs)
        self.update_verification_status()

    def generate_code(self):
        """Generate secure 6-digit OTP code with MM prefix"""
        self.otp_code = f"MM-{secrets.randbelow(1_000_000):06d}"
        self.expires_at = timezone.now() + timedelta(minutes=15)

    def invalidate_previous(self):
        """Invalidate previous unverified OTPs of same purpose"""
        self.user.otps.filter(
            purpose=self.purpose,
            is_verified=False
        ).update(expires_at=timezone.now())

    def update_verification_status(self):
        """Update user verification status when OTP verified"""
        if self.is_verified and self.purpose == 'VA':
            self.user.verification_status = 'verified'
            self.user.save(update_fields=['verification_status'])

    @property
    def is_expired(self):
        """Check if OTP has expired"""
        return timezone.now() > self.expires_at

    def clean(self):
        """Validate OTP expiration time"""
        if self.expires_at <= timezone.now():
            raise ValidationError(_("OTP expiration must be in the future"))

class UserProfile(models.Model):
    """Extended user profile information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(
        _("Avatar"),
        upload_to='avatars/',
        blank=True,
        validators=[
            FileExtensionValidator(['jpg', 'jpeg', 'png']),
        ],
        help_text="Profile picture (max 2MB, 512x512px)"
    )
    bio = models.CharField(
        _("Bio"), 
        max_length=80, 
        blank=True,
        help_text="Short personal description (80 characters max)"
    )

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.avatar:
            self.resize_avatar()

    def resize_avatar(self):
        """Resize and optimize avatar image"""
        try:
            with self.avatar.open() as f:
                img = Image.open(f)
                
                # Only resize if larger than target
                if img.width > 512 or img.height > 512:
                    output = BytesIO()
                    img.thumbnail((512, 512))
                    
                    # Preserve format
                    if img.format == 'JPEG':
                        img.save(output, format='JPEG', quality=85, optimize=True)
                    else:
                        img.save(output, format='PNG', optimize=True)
                    
                    # Save optimized image
                    self.avatar.save(
                        self.avatar.name,
                        BytesIO(output.getvalue()),  
                        save=False
                    )
                    super().save(update_fields=['avatar'])
        except Exception as e:
            logger.error(f"Avatar processing error for {self.user}: {str(e)}")

class KYCVerification(models.Model):
    DOCUMENT_TYPES = (
        ('PASSPORT', 'Passport'),
        ('DRIVING_LICENSE', 'Driving License'),
        ('NATIONAL_ID', 'National ID')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='kyc_verification')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES)
    document_front = models.FileField(upload_to='kyc/documents/', validators=[FileExtensionValidator(['pdf', 'jpg', 'jpeg', 'png'])])
    document_back = models.FileField(upload_to='kyc/documents/', validators=[FileExtensionValidator(['pdf', 'jpg', 'jpeg', 'png'])], blank=True)
    selfie = models.FileField(upload_to='kyc/selfies/', validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])], blank=True, null=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)
    next_review_date = models.DateField(null=True, blank=True)
    verification_result = models.JSONField(null=True, blank=True)  # Store OCR/validation results
    is_auto_verified = models.BooleanField(default=False)  # Track automation

    class Meta:
        verbose_name = _("KYC Verification")
        verbose_name_plural = _("KYC Verifications")
        indexes = [
            models.Index(fields=['user', 'document_type']),
            models.Index(fields=['next_review_date'])
        ]

    def __str__(self):
        return f"{self.user} - {self.get_document_type_display()}"

    def clean(self):
        if self.document_type == 'NATIONAL_ID' and not self.document_back:
            raise ValidationError(_("National ID requires both front and back images"))