FROM node:17-alpine as builder
# set the working directory
WORKDIR /frontend
# install dependencies
COPY package.json .
RUN npm install
RUN npm install dotenv --save
RUN apk update && apk add bash
RUN apk update
RUN apk add curl

# copy files from this repo into the working directory
COPY . .
# start the server