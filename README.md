# adidasSolutionArchitect
Adidas Solution Architect Challenge by Jorge Castillo

## To install the application
1. Clone this repository (it is public and no password is required)
2. It is required to have nodeJS (mine was 18.14.1, at least v18 to support fetch) and npm (mine was 9.3.1)
3. Execute npm install to download all dependencies

## To run the application locally
1. Install the app folowing steps described in [To install the application](##to-install-the-application)
2. Execute `npm run start`. The app will compile from typescript to javascript and the express server will be launched in address http://localhost:8080
3. Send requests to the API using any API tool (for instance postman). You can check list of available services in section API description

## To run the automatic tests
1. Install the app folowing steps described in [To install the application](##to-install-the-application)
2. Execute `npm run testSuite`. This command will compile the app from TS to JS, and then launch a test server and execute the automated API tests
3. Inspect test report (JEST generated) in command line

## API documentation

### Review service
#### GET (/review/{product_id})
* No authentication required.
##### Item found
* Service response code: 204
* Response datatype: JSON
* Response data: ProductID, Average Review Score, Number of Reviews
##### Item not found
* Service response code: 401
* Response datatype: JSON
* Response data: error
##### Server error
* Service response code: 500
* Response datatype: JSON
* Response data: error

#### POST (/review/{product_id}
* Authentication required.
  * Authentication type: Basic
  * Authentication encoding Base 64
  * Authentication credentials jcastillo:Start_123
##### Item inserted
* Service response code: 204
* Response datatype: JSON
* Response data: {}
##### Item not inserted
* Service response code: 500
* Response datatype: JSON
* Response data: error
##### Server error
* Service response code: 500
* Response datatype: JSON
* Response data: error

#### PUT (/review/{product_id}
* Authentication required.
  * Authentication type: Basic
  * Authentication encoding Base 64
  * Authentication credentials jcastillo:Start_123
##### Item updated
* Service response code: 204
* Response datatype: JSON
* Response data: {}
##### Item not found
* Service response code: 404
* Response datatype: JSON
* Response data: error
##### Server error
* Service response code: 500
* Response datatype: JSON
* Response data: error

#### DELETE (/review/{product_id}
* Authentication required.
  * Authentication type: Basic
  * Authentication encoding Base 64
  * Authentication credentials jcastillo:Start_123
##### Item updated
* Service response code: 204
* Response datatype: JSON
* Response data: {}
##### Item not found
* Service response code: 404
* Response datatype: JSON
* Response data: error
##### Server error
* Service response code: 500
* Response datatype: JSON
* Response data: error

### Review service
#### GET (/product/{product_id})
* No authentication required.
* Aggregation with data coming from
  * https://www.adidas.co.uk/api/products/{product_id}
  * GET /review/{product_id}
##### Item found
* Service response code: 204
* Response datatype: JSON
* Response data: {adidas API data, review data}
##### Server error
* Service response code: 500
* Response datatype: JSON
* Response data: error
