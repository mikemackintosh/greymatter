-- +goose Up
-- +goose StatementBegin
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE EXTENSION IF EXISTS "uuid-ossp";
-- +goose StatementEnd
