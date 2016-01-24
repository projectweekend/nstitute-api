FROM node:4.2

COPY package.json /src/package.json
RUN cd /src && npm install
WORKDIR /src
# TODO: add CMD here to run server.js
