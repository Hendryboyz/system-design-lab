#!/bin/bash

SOURCE_DIR=api/

VERSION_NUMBER=$(grep version $SOURCE_DIR/package.json | head -1 | awk -F: '{print $2}' | sed 's/[\",]//g' | tr -d '[[:space:]]')

echo "==== Start to build api image version: $VERSION_NUMBER ===="

docker build --no-cache -t "dsebd-demo-api:$VERSION_NUMBER" api/
docker image tag "dsebd-demo-api:$VERSION_NUMBER" "dsebd-demo-api:latest"
docker image tag "dsebd-demo-api:$VERSION_NUMBER" "hendryboyz/demo-api-dsebd:$VERSION_NUMBER"
docker image tag "dsebd-demo-api:$VERSION_NUMBER" hendryboyz/demo-api-dsebd:latest

docker image ls | grep dsebd-demo-api

echo "Push image dsebd-demo-api:$VERSION_NUMBER to docker? (Y/n)"

read IS_PUSH

if [ $(echo $IS_PUSH | tr '[:upper:]' '[:lower:]') = 'y' ]; then
  docker push hendryboyz/demo-api-dsebd:latest
  docker push "hendryboyz/demo-api-dsebd:$VERSION_NUMBER"
  echo "dsebd-demo-api:$VERSION_NUMBER is pushed"
fi


echo "Delete image dsebd-demo-api:$VERSION_NUMBER? (Y/n)"

read IS_DELETE

if [ $(echo $IS_DELETE | tr '[:upper:]' '[:lower:]') = 'y' ]; then
  echo "dsebd-demo-api:$VERSION_NUMBER is deleted"
  docker image rm "dsebd-demo-api:$VERSION_NUMBER" "dsebd-demo-api:latest"
fi