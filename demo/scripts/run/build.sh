#!/bin/bash

. .env && docker build -t cf-docker/$APP_NAME:$ENV .
