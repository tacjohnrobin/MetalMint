import logging
from django.http import JsonResponse
from django.urls import resolve
from rest_framework import status
from django.core.exceptions import PermissionDenied

logger = logging.getLogger(__name__)

class FinancialSecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # Protected URL prefixes (not namespaces, since banking uses 'transactions' namespace)
        self.protected_paths = [
            '/api/investments/',
            '/api/transactions/',
            '/api/analytics/',
        ]
        # Public paths that don’t require authentication or KYC
        self.public_paths = [
            '/api/auth/',
            '/dj-admin/',
            '/api-auth/',
        ]

    def __call__(self, request):
        path = request.path_info

        # Check if the path is public
        is_public = any(path.startswith(pub_path) for pub_path in self.public_paths)
        if is_public:
            return self.get_response(request)

        # Check authentication for all non-public paths
        if not request.user.is_authenticated:
            logger.warning(f"Unauthorized access attempt to {path} by IP {request.META.get('REMOTE_ADDR')}")
            return JsonResponse({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        # Check KYC for protected paths
        is_protected = any(path.startswith(prot_path) for prot_path in self.protected_paths)
        if is_protected and not request.user.is_kyc_valid():
            logger.warning(f"KYC not verified for user {request.user.email} attempting to access {path}")
            raise PermissionDenied("KYC verification required")

        return self.get_response(request)

    def process_exception(self, request, exception):
        if isinstance(exception, PermissionDenied):
            return JsonResponse({"error": str(exception)}, status=status.HTTP_403_FORBIDDEN)
        return None