# Django settings for finance_banking project.
from datetime import timedelta
import datetime
from django.core.validators import MinValueValidator
import os
from pathlib import Path
from celery.schedules import crontab

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = 'django-insecure-rgt!#o2f%30y$xrc+(-ik7yi(0n(5kwbyfe(hy$6+y%2c!#-cz'
DEBUG = True
ALLOWED_HOSTS = ['*']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_celery_results',
    'ordered_model',
    'corsheaders',
    'django_celery_beat',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'django_countries',
    'PIL',
    'user',
    'authentication',
    'banking',
    'investments',
    'analytics',
    'channels',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'middleware.security.FinancialSecurityMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'finance_banking.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'frontend' / 'build',
            BASE_DIR / 'authentication' / 'templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://165.22.41.223:3000"
    "http://165.22.41.223:8000"

]

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://165.22.41.223:3000",
    "http://165.22.41.223:8000"
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_HEADERS = True
CORS_ALLOW_ALL_METHODS = True
SECURE_CROSS_ORIGIN_OPENER_POLICY = None

WSGI_APPLICATION = 'finance_banking.wsgi.application'
ASGI_APPLICATION = 'finance_banking.asgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'metal_mint',
        'USER': 'metal_mint_user',
        'PASSWORD': 'wCh29&HE&T83',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
print("DATABASES Config:", DATABASES)

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Static and Media files
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
STATIC_ROOT = BASE_DIR / 'static'
STATIC_URL = '/static/'
STATICFILES_DIR = [
    BASE_DIR / 'frontend' / 'build' / 'static'
]

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'

# Custom User Model
AUTH_USER_MODEL = 'user.User'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework_simplejwt.authentication.JWTAuthentication'],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.AnonRateThrottle', 'rest_framework.throttling.UserRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'anon': '100/day', 'user': '1000/day'},
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer',),
}

# Simple JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    'ALGORITHM': 'HS256',
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'pkid',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

# Celery
CELERY_BROKER_URL = 'redis://localhost:6380/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6380/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'  # Use database scheduler

CELERY_BEAT_SCHEDULE = {
    'process_daily_payouts': {
        'task': 'investments.tasks.process_daily_payouts',
        'schedule': crontab(hour=0, minute=0),
    },
    'update_gold_prices': {
        'task': 'investments.tasks.update_gold_prices',
        'schedule': crontab(hour='*', minute=0),
    },
}

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'michaelndai997@gmail.com'
EMAIL_HOST_PASSWORD = 'zcrxltrfprwrkmip'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = 'michaelndai997@gmail.com'

# Channels
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('localhost', 6380)],
        },
    },
}

# Stripe
STRIPE_PUBLISHABLE_KEY='pk_test_51Lc84CDTMi1SAp13sTQneXvANuJIBXWOnOBylf40E6Divd7OAjYN8uPVf3z1aL5c2637Qb5liWacPUfKLFBLC6Qq00nGGHipZG'
STRIPE_SECRET_KEY ='sk_test_51Lc84CDTMi1SAp13nQ049H6S612ZRMLUe59soxZZleOT4HFTTT9kKpqni8XCrgbu7DdQdd0BTl1BCgmUerENnhr900Wbni7Xnj'
STRIPE_WEBHOOK_SECRET='whsec_e6fb9e740bfa6b76a29b7b890e11854593efa6b447c8b582cecd5081035ea1da'
STRIPE_TEST_MODE = True  # Set to False in production settings

# Encryption
FIELD_ENCRYPTION_KEY = 'T86V1XiaQnV_128P62njY_h5pUkN8ayKeJUnIn17xrQ='

FRONTEND_URL = "http://165.22.41.223:3000"
CORS_ALLOWED_ORIGINS = ["http://165.22.41.223:3000"]  # If using CORS

# Logging (Console-Only)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',  # Capture INFO and above
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'INFO',  # Match file level
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        '': {  # Root logger catches all modules
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'django': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'user': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'authentication': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
        'banking': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}