

## 0.1.0 (2024-07-28)


### Features

* allow to push local config ([d68d0fc](https://github.com/Hendryboyz/system-design-lab/commit/d68d0fc56ff95cf0a1b811f4be7881e86214efb4))
* avoid deleting ack ([1a644cc](https://github.com/Hendryboyz/system-design-lab/commit/1a644cc81e9a4a40868dec9ca6c7a55a68eea6d0))
* cdc components: source, mechanism and streaming platform ([4a8003d](https://github.com/Hendryboyz/system-design-lab/commit/4a8003d609e9cf2497b9a3444562f90fe2e1a997))
* cdc required db/queue to start work ([0898e45](https://github.com/Hendryboyz/system-design-lab/commit/0898e45a75fc418278ddf8e84b9c430ee3e0db21))
* consumer to pull cdc data from rabbitmq ([cf3733c](https://github.com/Hendryboyz/system-design-lab/commit/cf3733caf241b892ca22ec97c19c75a1fd8e9963))
* CRUD api error handling and refined ([9a34747](https://github.com/Hendryboyz/system-design-lab/commit/9a347475ecd1e8f5497b274f293b2f3524065e8e))
* find item and delete item logic ([9ca12a7](https://github.com/Hendryboyz/system-design-lab/commit/9ca12a7ebb6a82e614465903785677ca54c70751))
* fix vhost and postgres config to start cdc server ([4876aaf](https://github.com/Hendryboyz/system-design-lab/commit/4876aafa86db768de7f5c8b8d330d25ed8ffefa4))
* init api project with config and orm ([a33ed68](https://github.com/Hendryboyz/system-design-lab/commit/a33ed684cbaa51093e42785478b56bf6e53b109f))
* introduce factory with command pattern to sync db cdc command ([c43a48f](https://github.com/Hendryboyz/system-design-lab/commit/c43a48fe98620fa1d70ee77c1e43f2e4faea8753))
* logic to handle cdc delete/patch command ([c22bcda](https://github.com/Hendryboyz/system-design-lab/commit/c22bcdaeb8b18348c718227cc4909cd7e48164c9))
* middleware to verify and patch request ([0faaa4a](https://github.com/Hendryboyz/system-design-lab/commit/0faaa4a1c01a6d98082f65068c594c73de6104e1))
* only todo moudule apply resource specific middleware ([c41a46c](https://github.com/Hendryboyz/system-design-lab/commit/c41a46ce7f46518213bb804dcbfa604bf89e8d31))
* post todo item and presist to db ([4709dd0](https://github.com/Hendryboyz/system-design-lab/commit/4709dd0e2a7ed2117c6cebf134f603f3cd8a99f4))
* put/post remove all url query strings ([caa43c3](https://github.com/Hendryboyz/system-design-lab/commit/caa43c36132df390e4dcc9ff464e15f8b6690690))
* redirect to static assets route while accessing resources ([a82b394](https://github.com/Hendryboyz/system-design-lab/commit/a82b394f554d019c98d4ce26aec6d99e4120e7c5))
* sbcookie validation ([cf3fb07](https://github.com/Hendryboyz/system-design-lab/commit/cf3fb07fd296d493f8b142b55eb6d6bb510b17f5))
* sync insert command logic ([53ad9a7](https://github.com/Hendryboyz/system-design-lab/commit/53ad9a770f0b281b0316f5d01c742dace8e7db34))
* todo CRUD api ([40b4394](https://github.com/Hendryboyz/system-design-lab/commit/40b439476189d3424a54762c6b241f97d956dd4f))
* update todo item logic ([4771619](https://github.com/Hendryboyz/system-design-lab/commit/4771619d1a237664f9f431d42d8403a078c7f6cf))
* use file to define demo users instead of auth ([6ddb108](https://github.com/Hendryboyz/system-design-lab/commit/6ddb108dfc9b526d282ef4b8fedd515df0b499d6))


### Bug Fixes

* api health check endpoint ([e378ff9](https://github.com/Hendryboyz/system-design-lab/commit/e378ff9f10c5e6887086d14f91e05321d6f85c88))
* wrong userId field in cdc data ([edf293c](https://github.com/Hendryboyz/system-design-lab/commit/edf293c467e17a80bb7de9b84054d43c8b317fd9))


### CI

* apply release-it to manage version ([76a6408](https://github.com/Hendryboyz/system-design-lab/commit/76a6408a52cfc38c1df15d7355904f92d1ea847d))
* build/deploy app scripts ([e245aa6](https://github.com/Hendryboyz/system-design-lab/commit/e245aa61c27334c06e306d562f47acc2215b7d37))
* external api/queue config with docker-compose ([5c7dfd7](https://github.com/Hendryboyz/system-design-lab/commit/5c7dfd71a88b226283715019a58c7bc8ceed9f33))
* k8s manifesto to deploy infra ([a2036c4](https://github.com/Hendryboyz/system-design-lab/commit/a2036c4ce0088cc9459d488c14bfd3695ceeb04e))
* script and dockerfile to build app ([d937ff1](https://github.com/Hendryboyz/system-design-lab/commit/d937ff1a9df0551094210825c20dba47e4f5d845))
* use docker-compose profile to setup host infra ([a6dd3d1](https://github.com/Hendryboyz/system-design-lab/commit/a6dd3d1bb63a6179ac2a494d4bc225ec0704560a))
