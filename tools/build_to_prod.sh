#!/bin/bash

npm install --registry=https://registry.npm.taobao.org
NODE_ENV=production npm run build
scp -r dist/ remi@182.92.161.230:/home/remi/webapps/snow
rm -fr dist/
