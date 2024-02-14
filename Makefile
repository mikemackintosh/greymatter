ifneq (,$(wildcard ./.env))
    include .env
    export
endif

sql:
	sqlc generate

migrate:
	goose -s -dir=database/migrations create $(SUMMARY) sql 

migrate-up: 
	goose up

clean:
	@docker compose -f quickstart.yml kill
	@docker compose -f quickstart.yml rm -f -v
	@docker volume ls | grep -i greymatter | awk '{print $2}' | xargs docker volume rm || echo -e "\nNo volume to delete"

up:
	docker compose -f quickstart.yml up

up-all:
	docker compose -f quickstart.yml -f quickstart-with-elk.yml up	