### Instructions:

- Create a Postgre SQL container: this is the main database:

```
docker run --name postgresql -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres:11
```

- Create a MongoDB container: this is used to save the provider's notification when a user creates a new appointment:

```
docker run --name mongodb -p 27017:27017 -d -t mongo
```

- Create a Redis container: this is used to cache the most used used features:

```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

- Install the dependencies with `yarn install` or just `yarn`

- Run the project with `yarn dev:server`
