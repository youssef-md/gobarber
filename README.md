### To run this project locally follow these steps :wink:

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

3. Create the container for MongoDB:

```docker
docker run --name chavoso-mongo -p 27017:27017 -d -t mongo
```

4. Install MongoDB Compass and log with:

```docker
Hostname: localhost
Port: 27017
Authentication: None
```

5. Create the container for Redis to manage background jobs:

```docker
docker run --name chavoso-redis -p 6379:6379 -d -t redis:alpine
```

6. The scripts to run this project are:

- `yarn dev`: will start dev server on port :3333, certify that you have all the docker containers running.

- `yarn dev:debug`: will run this project in debug mode, after you run this script you have to start the debug mode in your vscode.

- `yarn queue`: will process the background jobs queue(execute it in another terminal)
