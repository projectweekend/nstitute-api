# nstitute-api



## Dev Environment Info

The local dev environment is managed using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).


### Build local environment
```
docker-compose build
```


### Start local environment
```
docker-compose up
```



## Data Conversion

Scripts used to convert data from legacy website to MongoDB are located in `./data-conversion`. You only need to set a MONGO_URL environment variable if you wish to run any of these items on a remote database. It will run locally in a Docker Compose database by default.


### Import Nsider (old site) to staging collections

```
docker-compose run app node import_data.js
```


## Convert imported Nsider (old site) data to nsider_archive collection

```
docker-compose run app node convert_data.js
```
