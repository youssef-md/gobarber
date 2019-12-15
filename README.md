To run this project locally follow these steps :wink:

1. Create the container for PostgreSQL:

```docker
docker run --name <container_name> -e POSTGRES_PASSWORD=<container_password> -p 5432:5432 -d postgres:11
```

2. Install Postbird or an alternative to it and log with:

```docker
Host: localhost
Port: 5432
Username: postgres
Password: <container_password>
```