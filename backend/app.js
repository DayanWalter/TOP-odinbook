// Import the 'http-errors' module for creating HTTP error objects.
const createError = require('http-errors');
// Import the 'express' framework.
const express = require('express');
// Import the 'cors' middleware for handling Cross-Origin Resource Sharing.
const cors = require('cors');
// Import the 'passport' authentication middleware.
const passport = require('passport');
// Import the 'JwtStrategy' for passport.
const JwtStrategy = require('./strategies/jwt');
// Use the JwtStrategy in passport.
passport.use(JwtStrategy);

// Import the 'path' module for working with file paths.
const path = require('path');
// Import the 'cookie-parser' middleware for parsing cookies.
const cookieParser = require('cookie-parser');
// Import the 'morgan' middleware for HTTP request logging.
const logger = require('morgan');

// Import the 'users' route.
const userRouter = require('./routes/user');
// Load environment variables from a '.env' file.
require('dotenv').config();

// Create an instance of the express application.
const app = express();
// Import the 'mongoose' library for MongoDB.
const mongoose = require('mongoose');
// Disable strict query mode for Mongoose.
mongoose.set('strictQuery', false);

// Set up mongoDB
// Define the MongoDB connection string using the production URI or the development URL from environment variables.
const mongoDB = process.env.MONGODB_URI || process.env.DEV_DB_URL;
// Call the 'main' asynchronous function and handle any errors that may occur.
main().catch((err) => console.log(err));
// Define an asynchronous function 'main' for connecting to MongoDB.
async function main() {
  // Use Mongoose to connect to the MongoDB database using the defined connection string.
  await mongoose.connect(mongoDB);
}

// Enable Cross-Origin Resource Sharing.
app.use(cors());
// Use 'dev' format for HTTP request logging.
app.use(logger('dev'));
// Parse incoming JSON requests.
app.use(express.json());
// Parse URL-encoded requests.
app.use(express.urlencoded({ extended: false }));
// Parse cookies.
app.use(cookieParser());
// Serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));

// Use the 'users' route for '/users' path.
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // Forward to error handler with a 404 error.
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  res.send('error');
});

// Export the express application.
module.exports = app;
