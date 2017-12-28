#!/bin/bash

. .env
env $(cat .env | grep ^[A-Z] | xargs) \
docker stack deploy \
-c docker-compose.yml $APP_NAME \
--with-registry-auth
