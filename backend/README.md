# MERN-Backend-Template

This is a template for the backend part of the template.

## What's configured?

### express

- express
- express-async-handler
- express-validator

### mongoDB

- mongoose

### hashing passwords

- bcryptjs

### authentication and authorization

- jsonwebtoken
- passport
- passport-jwt

### hiding passwords and usernames from github

- dotenv

### debugging and logging

- debug
- morgan

### Testing

- supertest

#### Usage of supertest

- open routes/
- open index.test.js

```bash
npm test
```

### Other middleware

- cors
- cookie-parser
- http-errors

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

## Environment Variables

- ACCESS_TOKEN_SECRET (for jwt)
- Generate random key:

```bash
node
require('crypto').randomBytes(64).toString('hex')
```

- DEV_DB_URL (for mongoDB)
- Example:
  "mongodb+srv://[username]:[password]@cluster0.xxpddtx.mongodb.net/?retryWrites=true&w=majority"

## Scripts

```bash
npm run start
npm run devstart
npm run serverstart
npm test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Fullstack and Frontend Template

If you haven't set up the frontend yet, check out our [MERN-Frontend-Template](../frontend), or [MERN-Fullstack-Template](../)

## License

[MIT](https://choosealicense.com/licenses/mit/)
