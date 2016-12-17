FROM node:6

RUN mkdir /src
RUN mkdir /src/app
COPY app/package.json /src/app/package.json
RUN cd /src/app && npm install
WORKDIR /src/app
