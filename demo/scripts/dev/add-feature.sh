#!/bin/bash
BRANCH=$1
echo "adding feature $BRANCH to develop"

git pull &&
git checkout $BRANCH &&
git checkout develop &&
git merge --no-ff $BRANCH
git push
