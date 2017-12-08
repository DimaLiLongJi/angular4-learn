#!/bin/bash

. .env

RETRIES=0
UPDATE_COMPLETE=0

while [[ $UPDATE_COMPLETE == 0 ]]; do
  if [[ $RETRIES > 0 ]]; then
    echo "waiting 5 seconds before retry update..."
    sleep 5
  fi
  if [[ $RETRIES > 3 ]]; then
    echo "ERROR:: UPDATE FAILED AFTER RETRYING FOR 3 TIMES"
    exit 1
  fi
  RETRIES=$(expr $RETRIES + 1)

  env $(cat .env | grep ^[A-Z] | xargs) \
  docker service update \
  -d=false \
  --image=$IMAGE \
  --container-label-add="version=$VERSION" \
  --force \
  --with-registry-auth \
  "$APP_NAME"_"$APP_NAME" && UPDATE_COMPLETE=1
done
