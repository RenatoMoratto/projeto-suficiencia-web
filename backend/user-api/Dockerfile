FROM node:alpine

WORKDIR /user-api
COPY package.json .
RUN npm i
COPY . .
CMD npm start
