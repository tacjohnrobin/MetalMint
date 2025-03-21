#!/bin/bash
set -e

# Create the role if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO \$\$ BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'finance_user') THEN
            CREATE ROLE finance_user WITH LOGIN PASSWORD 'wCh29&HE&T83';
        END IF;
    END \$\$;
    GRANT ALL PRIVILEGES ON DATABASE finance_db TO finance_user;
EOSQL