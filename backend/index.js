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

// Import the 'user' route.
const userRouter = require('./routes/userRouter');
// Import the 'post' route.
const postRouter = require('./routes/postRouter');
// Import the 'comment' route.
const commentRouter = require('./routes/commentRouter');

// Load environment variables from a '.env' file.
require('dotenv').config();

// Create an instance of the express application.
const app = express();
// ENTER DB HERE!
const db = require('./db');
db();
// END DB
// Enable Cross-Origin Resource Sharing.
app.use(
  cors()
  //   {
  //   origin: ['https://top-odinbook-frontend.vercel.app/'],
  //   methods: ['POST', 'GET'],
  //   credentials: true,
  // }
);
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

// Use the 'user' route for '/user' path.
app.use('/api/user', userRouter);
// Use the 'post' route for '/post' path.
app.use('/api/post', postRouter);
// Use the 'post' route for '/post' path.
app.use('/api/comment', commentRouter);

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
