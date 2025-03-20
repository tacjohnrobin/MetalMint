import logging
from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class FinancialSecurityMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        self.get_response = get_response
        self.protected_paths = [
            '/api/investments/',
            '/api/transactions/',
            '/api/analytics/',
        ]
        self.user_paths = [
            '/api/users/',
        ]
        self.public_paths = [
            '/api/auth/',
            '/dj-admin/',
            '/api-auth/',
        ]
        self.jwt_authenticator = JWTAuthentication()

    def __call__(self, request):
        path = request.path_info
        logger.debug(f"Request path: {path}")

        # Check if the path is public
        if any(path.startswith(pub_path) for pub_path in self.public_paths):
            logger.debug(f"Public path accessed: {path}")
            return self.get_response(request)

        # Authenticate the user using JWT
        try:
            user, token = self.jwt_authenticator.authenticate(request)
            request.user = user
            logger.debug(f"Authenticated user: {user.email}")
        except Exception as e:
            logger.warning(f"Authentication failed: {str(e)}")
            return JsonResponse({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        # Check authentication for user paths
        if any(path.startswith(user_path) for user_path in self.user_paths):
            if not request.user.is_authenticated:
                logger.warning(f"Unauthorized access attempt to {path} by IP {request.META.get('REMOTE_ADDR')}")
                return JsonResponse({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
            logger.debug(f"Authenticated access to user path {path} by {request.user.email}")
            return self.get_response(request)

        # Check KYC for protected paths
        if any(path.startswith(prot_path) for prot_path in self.protected_paths):
            if not request.user.is_kyc_valid():
                logger.warning(f"KYC not verified for user {request.user.email} attempting to access {path}")
                raise PermissionDenied("KYC verification required")

        logger.debug(f"Authorized access to {path} by user {request.user.email}")
        return self.get_response(request)

    def process_exception(self, request, exception):
        if isinstance(exception, PermissionDenied):
            return JsonResponse({"error": str(exception)}, status=status.HTTP_403_FORBIDDEN)
        return None
