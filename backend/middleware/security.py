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
        self.user_paths = [
            '/api/users/',
            '/api/investments/',
            '/api/transactions/',
            '/api/analytics/',
        ]
        self.public_paths = [
            '/api/auth/',
            '/dj-admin/',  # Note: Consider removing if admin should require auth
            '/api-auth/',
        ]
        self.jwt_authenticator = JWTAuthentication()

    def __call__(self, request):
        path = request.path_info
        logger.debug(f"Request path: {path}")

        # Allow public paths without authentication
        if any(path.startswith(pub_path) for pub_path in self.public_paths):
            logger.debug(f"Public path accessed: {path}")
            return self.get_response(request)

        # Authenticate user using JWT for all other paths
        try:
            user, token = self.jwt_authenticator.authenticate(request)
            request.user = user
            logger.debug(f"Authenticated user: {user.email}")
        except Exception as e:
            logger.warning(f"Authentication failed for {path}: {str(e)}")
            return JsonResponse({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        # Enforce authentication for user-specific paths
        if any(path.startswith(user_path) for user_path in self.user_paths):
            if not request.user.is_authenticated:
                logger.warning(f"Unauthorized access attempt to {path} by IP {request.META.get('REMOTE_ADDR')}")
                return JsonResponse({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Log access to user paths for auditing
            logger.debug(f"Authenticated access to {path} by {request.user.email}")
            
            # Optional: Add a header to indicate user context for downstream validation
            request.META['X-Authenticated-User'] = str(user.pkid)
            
            # Proceed to views, which will enforce user-specific data access
            response = self.get_response(request)
            return response

        # Allow non-user paths to proceed (if any exist outside public/user paths)
        return self.get_response(request)

    def process_exception(self, request, exception):
        if isinstance(exception, PermissionDenied):
            logger.warning(f"Permission denied for {request.path_info}: {str(exception)}")
            return JsonResponse({"error": str(exception)}, status=status.HTTP_403_FORBIDDEN)
        return None