#!/bin/bash
echo Restoring from $STAGING_DATABASE_URL
echo to $DATABASE_URL

# Ensure there aren't active connections (psql will error if there are)
connections=$(psql $DATABASE_URL -t -c "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = 'late_stage' AND state = 'idle';")

if [ "$connections" -gt "0" ]; then
   echo "There are currently active connections to the local database to be restored. Please close them and try again.";
   exit 1;
fi

# Get a dump of the staging database pipe it to the local database
pg_dump $STAGING_DATABASE_URL \
   --no-password \
   --verbose \
   --format=p \
   --no-owner \
   --no-privileges \
   --no-tablespaces \
   --no-unlogged-table-data \
   --clean \
   | psql --dbname late_stage