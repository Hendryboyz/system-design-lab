#!/bin/bash

SOURCE_DIR=api/

VERSION_NUMBER=$(grep version $SOURCE_DIR/package.json | head -1 | awk -F: '{print $2}' | sed 's/[\",]//g' | tr -d '[[:space:]]')

echo "==== Start to deploy api image version: $VERSION_NUMBER ===="

pushd k8s/app/overlay/dev/
kustomize edit set image app_image="hendryboyz/demo-api-dsebd:$VERSION_NUMBER"
kustomize build | kubectl apply -f -
# kustomize build > deploy.yaml
popd

# minikube service -n infra rabbitmq-nodeport-service --url