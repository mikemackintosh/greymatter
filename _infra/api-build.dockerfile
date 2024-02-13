# syntax=docker/dockerfile:1
FROM golang:1.22-alpine

ARG X_COMMIT_SHA
ARG BUILD_ENV
ENV COMMIT_SHA=$X_COMMIT_SHA
ENV BUILD_ENV=$BUILD_ENV

VOLUME /app
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

RUN go install github.com/cosmtrek/air@latest

EXPOSE 8080