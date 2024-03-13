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
1. Use Hexagonal/Clean Architecture
- It helps to organize code in a modular, testable and maintainable way.


Example: you create a booking via REST. The controller gathers the input and invokes a "reserveRoom" use case in Booking bounded context. The use case, in turn, calls the AvailabilityService in Availability bounded context to decrement the number of available rooms and PaymentService to check the validity of the credit card.