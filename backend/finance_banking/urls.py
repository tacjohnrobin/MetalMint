from django.conf import settings
from django.contrib import admin
from django.urls import path, include 
from django.conf.urls import static

urlpatterns = [
    path("dj-admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),

    # Reviewed applications
    path("api/auth/",         include("authentication.urls")),
    path("api/users/",        include("user.urls")),
    path('api/banking/',      include('banking.urls', namespace='banking')),
    path('api/investments/',  include('investments.urls', namespace='investments')),
    path('api/analytics/',    include('analytics.urls', namespace='analytics')),

    
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # SERVE STATIC AND MEDIA FILES FROM DEVELOPMENT SERVER
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)