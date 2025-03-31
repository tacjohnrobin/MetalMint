#!/bin/bash
set -e

until pg_isready -h db -p 5432 -U finance_user; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Seeding initial gold price..."
python manage.py seed_gold_price

echo "Seeding investment packages..."
python manage.py seed_packages

echo "Initializing gold price simulation..."
celery -A finance_banking call investments.tasks.update_gold_prices

touch /app/migrations_done

exec gunicorn --bind 0.0.0.0:8000 --workers 3 finance_banking.wsgi:application