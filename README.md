# BitFeather Fullstack Project README

## Description

This is a Fullstack project consisting of a frontend and a backend. The frontend is built using React, while the backend is developed with Express and MongoDB.

## Frontend

The frontend is a React application created with Vite as the build tool.

### Installation

1. Open a terminal.
2. Navigate to the `frontend` directory.
3. Run `npm install` to install the dependencies.

### Available Scripts

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Builds a production-ready version.
- `npm test`: Runs tests using Jest.
- `npm run lint`: Runs ESLint for code linting.
- `npm run preview`: Starts the Vite development server in preview mode.

### Dependencies

- React
- React-DOM
- React Router DOM
- Material Design Icons (MDI)
- Vite (Development tool)
- Jest (Test tool)
- ESLint (Code linter)

## Backend

The backend is an Express application using MongoDB as the database.

### Installation

1. Open a terminal.
2. Navigate to the `backend` directory.
3. Run `npm install` to install the dependencies.

### Available Scripts

- `npm start`: Starts the production server.
- `npm run devstart`: Starts the development server with Nodemon.
- `npm run serverstart`: Starts the development server with debug mode.
- `npm test`: Runs tests using Jest.

### Dependencies

- Express
- Mongoose (MongoDB ODM)
- bcryptjs
- cookie-parser
- cors
- dotenv
- express-async-handler
- express-validator
- helmet
- jsonwebtoken
- morgan
- nodemon (Development dependency)
- passport
- passport-jwt
- Jest (Test tool)
- supertest (Test tool)

## Note

Ensure you configure the environment variables appropriately, especially for the backend (e.g., MongoDB URI, JWT Secret).
