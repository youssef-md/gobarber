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

3. You can run two npm scripts for the development mode: 
* ```yarn dev```: will start dev server on port :3333, certify that you have all the docker containers running.
  
* ```yarn dev:debug```: will run this project in debug mode, after you run this script you have to start the debug mode in your vscode.