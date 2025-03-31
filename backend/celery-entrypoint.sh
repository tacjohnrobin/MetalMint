#!/bin/bash
set -e

until pg_isready -h db -p 5432 -U finance_user; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

until [ -f /app/migrations_done ]; do
  echo "Waiting for migrations and gold price initialization to complete..."
  sleep 2
done

exec "$@"