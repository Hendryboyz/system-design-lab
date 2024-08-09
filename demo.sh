#!/bin/bash
minikube start
docker-compose --profile infra up -d
minikube service -n infra rabbitmq-cluser-service
minikube service -n default demo-api-dsebd-nodeport-service
# dsebd/api/docs
npm run start