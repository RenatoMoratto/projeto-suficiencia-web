FROM node:alpine as builder

WORKDIR /frontend
COPY package.json .
RUN yarn
COPY . .

ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN yarn build

EXPOSE $REACT_DOCKER_PORT 

CMD yarn preview --host
