#!/bin/bash

export NODE_ENV=test

# TODO: Read the config for db connection string

CONNECTION_STRING=`awk '/const mysqlConnectionString\s+=\s+{/,/};/' app/configs/environments/test.js`
DB_HOST=`echo $CONNECTION_STRING | awk -F"host: '" '{print $2}' | awk -F"'" '{print $1}'`
DB_USER=`echo $CONNECTION_STRING | awk -F"user: '" '{print $2}' | awk -F"'" '{print $1}'`
DB_PASS=`echo $CONNECTION_STRING | awk -F"password: '" '{print $2}' | awk -F"'" '{print $1}'`
DB_DATABASE=`echo $CONNECTION_STRING | awk -F"database: '" '{print $2}' | awk -F"'" '{print $1}'`
DB_PORT=`echo "$CONNECTION_STRING" | awk -F"port: |," '{print $2}'`
TEST_DATABASE_NAME="$DB_DATABASE"_`cat /dev/urandom | tr -dc 'a-f0-9' | head -c 32`

SETUP_DB_COMMAND="CREATE DATABASE IF NOT EXISTS $TEST_DATABASE_NAME; GRANT ALL PRIVILEGES ON $TEST_DATABASE_NAME TO '$DB_USER'@'%'; FLUSH PRIVILEGES;"
mysql -h $DB_HOST -u $DB_USER --port $DB_PORT --password=$DB_PASS --database $DB_DATABASE -e "$SETUP_DB_COMMAND" &> /dev/null
sed -i "s/$DB_DATABASE/$TEST_DATABASE_NAME/" app/configs/environments/test.js

node server.js &> /dev/null &
NODE_SERVER_PID=`echo $!`

while :
do
  curl -X GET http://localhost:3000/ping &> /dev/null
  if [[ $? -eq 0 ]]
  then
    break
  else
    sleep 0.25
  fi
done

TEST_DATABASE_NAME=$TEST_DATABASE_NAME node --test --test-concurrency=1 --experimental-test-coverage --test-force-exit --test-timeout 30000 tests/api/*.test.js

sed -i "s/$TEST_DATABASE_NAME/$DB_DATABASE/" app/configs/environments/test.js
TEARDOWN_DB_COMMAND="DROP DATABASE IF EXISTS $TEST_DATABASE_NAME;"
mysql -h $DB_HOST -u $DB_USER --port $DB_PORT --password=$DB_PASS --database $DB_DATABASE -e "$TEARDOWN_DB_COMMAND" &> /dev/null

if [[ $NODE_SERVER_PID ]]
then
  kill -9 $NODE_SERVER_PID
fi
