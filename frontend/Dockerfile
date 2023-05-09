FROM node:alpine as builder

# Gera CA
RUN apk update && apk add --no-cache nss-tools curl
RUN curl -L https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 -o /usr/local/bin/mkcert
RUN chmod +x /usr/local/bin/mkcert

WORKDIR /frontend
COPY package.json .

RUN mkdir -p /etc/docker/certs.d && mkdir -p ./.cert && mkcert -install && mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem 'localhost'

RUN yarn

COPY . .

ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN yarn build

EXPOSE $REACT_DOCKER_PORT

CMD yarn preview --host
