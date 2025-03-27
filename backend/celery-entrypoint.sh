#!/bin/bash
set -e

# Wait for the database to be ready
until pg_isready -h db -p 5432 -U finance_user; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Wait for migrations to complete
until [ -f /app/migrations_done ]; do
  echo "Waiting for migrations to complete..."
  sleep 2
done

# Execute the command passed via docker-compose.yml
exec "$@"