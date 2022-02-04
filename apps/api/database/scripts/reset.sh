#!/bin/bash

connection_string="postgres://$DATABASE_CONNECTION_USERNAME:$DATABASE_CONNECTION_PASSWORD@$DATABASE_CONNECTION_HOST:5432/postgres"

connections=$(psql ${connection_string} -t -c "select count(*) from pg_stat_activity where datname = '${DATABASE_CONNECTION_DATABASE}';")

if [ "$connections" -gt "0" ]; then
   echo "There are currently active connections. Please close them and try again.";
   exit 1;
fi

psql -a ${connection_string} -c "DROP DATABASE $DATABASE_CONNECTION_DATABASE" -c "CREATE DATABASE $DATABASE_CONNECTION_DATABASE"