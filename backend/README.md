# guess-password backend

## Requirements

you need Node and npm. To install all th libraries required by the project run:

`npm install`

## Start server (http://localhost:3010)

`npm start`

## To run the tests

`npm test`


## Services Implemented

There are two services:

1. new-password: Generated a password, returns the hint
   url:http://localhost:3010/new-password
   method: GET

   
2. verify-password: Verify the answer attempt against the password
   url:http://localhost:3010/verify-password
   method: POST