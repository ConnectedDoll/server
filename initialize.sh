#!/bin/bash

cd app
npm install

cd app/web/vue-app
npm run build

cd ../../../
docker-compose down
docker-compose build
docker-compose up -d