#!/bin/bash
set -e

# Wait for the database to be ready
until pg_isready -h db -p 5432 -U finance_user; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Start Gunicorn
exec gunicorn --bind 0.0.0.0:8000 --workers 3 finance_banking.wsgi:application