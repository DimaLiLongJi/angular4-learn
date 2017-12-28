#!/bin/sh
set -e
HOTFIX_BRANCH=$1
echo "start hotfix $HOTFIX_BRANCH"

# merge hotfix to master
git pull &&
git checkout $HOTFIX_BRANCH &&
git pull &&
git checkout master &&
git pull &&
git merge --no-ff $HOTFIX_BRANCH &&
git push &&

# pub
npm run pub-prod &&

echo 'pub prod success!'

# merge hotfix to develop
git checkout develop &&
git pull &&
git merge --no-ff $HOTFIX_BRANCH &&
git push &&
npm run pub-test
