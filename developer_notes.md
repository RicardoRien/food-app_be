### How to run Docker.
docker-compose build && docker-compose up

### Postgres Server
Host name/address: postgres
port: 5432
Maintenance database: food_store 
username: ricardo
password: admin123

### Docker commands:
#### Open terminal in a container.
docker exec -it prisma-postgres-api bash
#### Or
docker exec -it prisma-postgres-api /bin/sh

### Migrate DBA:
docker exec -it prisma-postgres-api yarn prisma migrate dev --name init

### build image
sudo docker-compose build --no-cache
