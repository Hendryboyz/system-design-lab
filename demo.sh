#!/bin/bash
minikube start
docker-compose --profile infra up -d
minikube service -n infra rabbitmq-cluser-service
npm run start