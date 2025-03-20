# finance_banking/__init__.py
default_app_config = 'finance_banking.apps.FinanceBankingConfig'
from .celery import app as celery_app
__all__ = ('celery_app',)