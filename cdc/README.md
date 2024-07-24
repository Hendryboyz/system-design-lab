

## TODO
* [X] Implement CRUD API
* [X] Capture data change in postgres
* [X] Consumer to pull data change to sync database

## Future Work

* [ ] Create exchange, queue than bind queue after rabbitmq init finished
* [ ] Study how to use debezium connector to sync internal/external postgres to avoid implementing consumer
* [ ] CDC consumer have to poll message in order. separate the consumer to isolated deployment to allow api to scale