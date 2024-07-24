#!/bin/bash

SOURCE_DIR=api/

VERSION_NUMBER=$(grep version $SOURCE_DIR/package.json | head -1 | awk -F: '{print $2}' | sed 's/[\",]//g' | tr -d '[[:space:]]')

echo "==== Start to build api image version: $VERSION_NUMBER ===="

docker build -t "dsebd-demo-api:$VERSION_NUMBER" api/
docker image tag "dsebd-demo-api:$VERSION_NUMBER" "dsebd-demo-api:latest"

docker image ls | grep dsebd-demo-api

echo "Delete image dsebd-demo-api:$VERSION_NUMBER? (Y/n)"

read IS_DELETE

if [ $(echo $IS_DELETE | tr '[:upper:]' '[:lower:]') = 'y' ]; then
  echo "dsebd-demo-api:$VERSION_NUMBER is deleted"
  docker image rm "dsebd-demo-api:$VERSION_NUMBER" "dsebd-demo-api:latest"
fi