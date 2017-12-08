#!/bin/sh
set -e

ENV=$1
BRANCH="$(git symbolic-ref HEAD 2>/dev/null)"

git pull && git push
echo "\033[32m git push complete \033[0m"

GST="$(git status --porcelain)"
if [ -n "$GST" ]; then
  echo "\033[31m commit first: working directory NOT clean \033[0m"
  exit 1;
fi

if ! [[ "$ENV" =~ (test|stage|production) ]]; then
  echo "invalid ENV argument(should be test/production/...)!"
  exit
fi

if [[ "$ENV" =~ (stage|production) ]]; then
  if ! [[ "$BRANCH" =~ (stage|master) ]]; then
    echo "\033[31myou are not in master/stage branch: $BRANCH \033[0m"
    exit 1;
  fi
  echo "$ENV$ENV$ENV$ENV$ENV"
  . ./scripts/dev/tag.sh $ENV
fi
echo "\033[32m tag complete \033[0m"

TAG="$(git describe --tags `git rev-list --tags --max-count=1`)"

if [[ "$ENV" == "test" ]]; then
  echo "\033[32m start pushing branch $BRANCH to test... \033[0m"
  git push $ENV $BRANCH -f
else
  echo "\033[32m pushing $TAG to $ENV \033[0m"
  git push $ENV $TAG
fi

/usr/bin/osascript -e "display notification \"Deploy $BRANCH to $ENV succeeded!\" with title \"Deploy notice\""
