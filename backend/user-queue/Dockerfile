FROM node:alpine

WORKDIR /user-queue
COPY package.json .
RUN npm i
COPY . .
CMD npm start
