#!/bin/bash

. .env

 docker service rollback \
 "$APP_NAME"_"$APP_NAME" \
--detach=false
