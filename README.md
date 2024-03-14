# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Scripts 
`npm start` starts the server

`npm test` executes the tests

## Goal
1. Adjust POST /users that it accepts a user and stores it in a database.
    * The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
   * This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.

# My changes
i have refactored the app to use Hexagonal/Clean Architecture
a with the idea being to demonstrate an understanding of
software design paradigms.

clean architecture attempts to break down code into different
units that do one very specific thing, keep them Modular and maintainable


# Directory Strucuture
 - Application
    - services
    - use-cases

 - Domain
    - entities
    - validation
    - repositories

 - Infrastructure
    - inbound
        - http
    - outbound
        - database



# Application layer

files in Application layer deal with data manipulation and business logic
these are services and use-cases.

in this example use-cases are the meat of the application
they gather information from different services, do transforms
and pass the data to either a user or to a service.

services are more like data transport, moving data from use-cases
to data stores or from data stores to use cases, in the form of  entities.
services can also perform some business logic but rather offload this information to
the use-cases or to entities themselves. services will most likely instantiate an entity
and cary the information in that form.



Example: you create a booking via REST. The controller gathers the input and invokes a "reserveRoom" use case in Booking bounded context. The use case, in turn, calls the AvailabilityService in Availability bounded context to decrement the number of available rooms and PaymentService to check the validity of the credit card.

# Getting Started
1. setup your environment, copy the `.env.example` to a new file `.env`
2. install the dependencies `npm i`
3. run the tests `npm run test`

If you are using docker
4. build and run the containers `docker-compose up -d` or `docker-compose up` if you like logs
    - mongo container on port `27017`
    - application container on port `4111`

If you are running the app on your local machine
5. make sure your have a mongoDB running on `localhost:27017`

# Using Docker
you might need to add the project folder to shared paths from Docker -> Preferences... -> Resources -> File Sharing

If you encounter errors with bcypt you probably need to remove your local node_modules
`rm -rf node_modules/`

than run a clean build `docker-compose up --build be`
