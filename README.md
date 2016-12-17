# nstitute-api

## Local Setup without Docker

Set the following environment variables:
* `IP` - Set this to localhost: `127.0.0.1`.
* `PORT` - Set this to whatever port you want.
* `MONGO_URI` - Set this to the URI for your local MongoDB: `mongodb://localhost/whatever`

1. Change into the app directory: `cd app`
1. Install dependencies: `npm install`
1. Run the app: `node keystone.js`


## Local Setup with Docker

Environment variables are already set in the `docker-compose.yml`.

1. Run the app: `docker-compose up`
