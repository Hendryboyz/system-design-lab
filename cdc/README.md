

## TODO
* [X] Implement CRUD API
* [X] Capture data change in postgres
* [X] Consumer to pull data change to sync database
* [X] Structure the different command to sync database
* [X] Logic to sync create/update/delete command

### Criteria

1. [X] redirect to other url via middleware and end the original req/res cycle
2. [X] cookie header validate and parse
3. [X] `GET` request verify `refer` header
4. [X] `GET` request add `from` to header
5. [X] `PUT`/`POST` remove all url query strings
6. [X] `PUT`/`POST` agent verification
7. [X] `PUT`/`POST` request format verification
8. [X] use config to control the agent allowing to `DELETE` resources
9. [X] add timestamp to all http request
10. [X] limit request domain


## Future Work

* [ ] Create exchange, queue than bind queue after rabbitmq init finished
* [ ] Study how to use debezium connector to sync internal/external postgres to avoid implementing consumer
* [ ] CDC consumer have to poll message in order. separate the consumer to isolated deployment to allow api to scale
* [ ] Refine middleware dependencies