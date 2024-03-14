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



### Application layer

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

### Domain

This layer mostly deals with types in our system
here we can find our user entity or user type,
this class is responsible for defining what a user is
and what a user can do.

we also have other types here such as ports (repository) which
must be implanted by any outside source that would like to receive data
from our system.

### Infrastructure

these are outside exchangeable parts of our system, they contain no
business logic things like (databases, http servers) these can be added
or swapped out, in this example we use MongoDB and Express but we could just
as easily swap these out for postgreSQL and a hapijs server and
the rest of our business logic will not change or even need to be
refactored.

The database reading and writing is handled by mongoose via our repository,
the repository here does gets an interface from the domain layer this interface
will tell it which methods to implement(which methods the userService will call and
which data will be passed.

#### The http server
The http server in this case an expressjs server will interact with our system via
use-cases.

The server is setup in a pretty standard manner
- controllers
- routes
- middleware
- utils
- app.ts
- server.ts

since we are using dependency injection
we have a container class which will setup all the
instances, we also have a route factory which will take
an instance of a controller and return the routes appropriate
for this controller by looking at the instance type.

this way we can automatically inject all decencies right into the
system when we start up the server.

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
