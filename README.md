# Learning Node - Express and MongoDB API

## Project Summary
This project is a Node.js REST API built with Express and MongoDB (Mongoose). It includes:

- User management with signup and login
- Menu management endpoints
- Passport Local authentication setup
- JWT token generation and token verification middleware
- Basic request logging middleware

The current codebase is a learning project with good foundational structure and some implementation issues that should be fixed before production use.

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- Passport and Passport Local
- JSON Web Token
- bcrypt
- dotenv

## Folder Structure
- auth.js: Passport Local strategy middleware
- db.js: MongoDB connection setup
- jwt.js: JWT middleware and token generator
- server.js: App bootstrap and route mounting
- models/person.js: Person schema and password helpers
- models/menulist.js: Menu schema
- routes/personRoutes.js: Person-related endpoints
- routes/menuRoutes.js: Menu-related endpoints
- study/: Practice files, excluded from git

## How the App Works
1. server.js starts an Express server on port 3000.
2. db.js opens a Mongoose connection to the hotels database.
3. Routes are mounted:
   - /person for user-related operations
   - /menulist for menu operations
4. JWT is used for protected profile access on one route.
5. Passport Local strategy is configured for username/password validation.

## Prerequisites
- Node.js 18 or later
- MongoDB running locally on default port 27017

## Installation
1. Install dependencies:

~~~bash
npm install
~~~

2. Create a .env file in project root with at least:

~~~env
JWT_SECRET=your_strong_secret
DB_URL=mongodb://localhost:27017/hotels
~~~

Note: Current db.js is using a hardcoded local Mongo URL and not DB_URL from .env.

## Run the Project
Use one of these commands:

~~~bash
node server.js
~~~

or

~~~bash
npx nodemon server.js
~~~

The server runs at:
http://localhost:3000

## API Endpoints

### Root
- GET /
- Behavior: Protected by Passport Local middleware in current implementation.

### Person Routes
Base path: /person

- POST /person/signup
- Purpose: Create a new person and return JWT token
- Request body example:

~~~json
{
  "name": "Alex",
  "age": 24,
  "work": "chef",
  "email": "alex@example.com",
  "username": "alex24",
  "password": "secret123"
}
~~~

- POST /person/login
- Purpose: Login with username and password, return JWT token
- Request body example:

~~~json
{
  "username": "alex24",
  "password": "secret123"
}
~~~

- GET /person/
- Purpose: Fetch all people

- GET /person/:work
- Purpose: Fetch people by work type
- Allowed values: chef, waiter, owner

- PUT /person/:id
- Purpose: Update person by MongoDB id

- GET /person/person
- Purpose: Fetch current user profile
- Auth: Requires Authorization header in Bearer token format

### Menu Routes
Base path: /menulist

- GET /menulist/
- Purpose: Fetch all menu items

- POST /menulist/
- Purpose: Add menu item
- Request body example:

~~~json
{
  "name": "Paneer Tikka",
  "price": 240
}
~~~

## Authentication Overview
- JWT generation happens in person signup and login handlers.
- JWT validation happens in jwt.js middleware.
- Passport Local strategy is configured in auth.js.

## Current Issues Found During Analysis
These are important findings in the current code:

1. auth.js uses person.findOne but person model is not imported.
2. models/person.js uses arrow functions in schema pre-save and comparePassword where this is required. This can break password hashing and password compare.
3. routes/personRoutes.js login token is generated from req.body.email instead of the database user email.
4. routes/personRoutes.js defines GET /:work before GET /person, so /person/person can be captured by the dynamic route first.
5. jwt.js returns status 500 for invalid token; 401 is more correct for unauthorized requests.
6. jwt.js checks authorization header presence but does not fully validate Bearer prefix.
7. package.json includes body-parse dependency (likely typo) and no start/dev scripts.
8. db.js has DB_URL support commented out and currently always uses local hardcoded URL.

## Suggested Next Improvements
- Fix all authentication-related issues first.
- Add proper npm scripts for start and dev.
- Add request validation for all input bodies.
- Add centralized error handler middleware.
- Add basic tests for signup, login, and protected profile route.
- Return consistent response format and status codes.

## Git and Environment Notes
- .env is ignored in git, which is correct.
- node_modules and study folder are ignored.

## Learning Value
This project shows strong practical learning on Express routing, MongoDB integration, and auth basics. After fixing the listed issues, it can become a solid baseline API project.
