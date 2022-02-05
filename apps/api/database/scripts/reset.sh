#!/bin/bash
echo Resetting $DATABASE_URL

# Ensure there aren't active connections (psql will error if there are)
connections=$(psql $DATABASE_URL -t -c "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = '$DATABASE_NAME' AND state = 'idle';")

if [ "$connections" -gt "0" ]; then
   echo "There are currently active connections. Please close them and try again.";
   exit 1;
fi

psql \
   -a $DATABASE_NAME \
   -c "DROP DATABASE $DATABASE_NAME" \
   -c "CREATE DATABASE $DATABASE_NAME"