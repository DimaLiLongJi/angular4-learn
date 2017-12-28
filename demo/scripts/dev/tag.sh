#!/bin/sh

ENV=$1
VERSION="$(git describe)"

if ! [[ $VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  LASTEST_TAG="$(git describe --tags `git rev-list --tags --max-count=1`)"

  read -p "new tag(current $LASTEST_TAG):" TAG

  if ! [[ $TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo 'tag invalid!'
    exit 1;
  fi

  if [[ "$ENV" == "stage" ]]; then
    TAG="$TAG-stage"
    exit 1;
  fi

  git tag $TAG
  # -a

  echo "git push origin $TAG"
  git push origin $TAG
fi
