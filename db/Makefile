.PHONY: fmt
fmt:
	python -m black api
	python -m isort api --profile=black

POSTGRES_URL:='postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable'
up:
	export POSTGRES_URL=$(POSTGRES_URL)
	migrate -database ${POSTGRES_URL} -path migrations up
down:
	export POSTGRES_URL=$(POSTGRES_URL)
	migrate -database ${POSTGRES_URL} -path migrations down
seed:
	docker exec -it i2eye-back-2021_db_1 psql -U postgres -f /sql/seed.sql