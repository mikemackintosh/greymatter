# syntax=docker/dockerfile:1
FROM node:latest

ARG X_COMMIT_SHA
ARG BUILD_ENV
ENV COMMIT_SHA=$X_COMMIT_SHA
ENV BUILD_ENV=$BUILD_ENV

VOLUME /app/web
WORKDIR /app/web

RUN npm install vite 
COPY web/package.json web/yarn.lock ./
RUN yarn install

EXPOSE 3000
CMD REACT_APP_ENV=$BUILD_ENV yarn start