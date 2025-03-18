from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from .models import User, UserProfile, KYCVerification

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a UserProfile instance when a new User is created"""
    if created:
        with transaction.atomic():
            UserProfile.objects.create(user=instance)

@receiver(post_save, sender=KYCVerification)
def update_user_kyc_status(sender, instance, created, update_fields, **kwargs):
    """Update User.kyc_status after KYCVerification changes"""
    with transaction.atomic():
        instance.user.update_kyc_status()