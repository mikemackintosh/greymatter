FROM golang:1.22-alpine

WORKDIR /app
COPY . .


COPY go.mod go.sum ./
RUN go mod download

RUN go install github.com/cosmtrek/air@latest
RUN go build -v -o /api cmd/api/*.go

CMD '/api'