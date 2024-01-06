// Setup file for tests. Just import to every test
// Import the 'express' framework.
const express = require('express');
// Create an instance of the express application.
const app = express();
// Import request from "supertest"
const request = require('supertest');
// Import the 'index' route.
const index = require('./index');
// Import the 'users' route.
const users = require('./users');
// Import more routes...

// Parse URL-encoded requests.
app.use(express.urlencoded({ extended: false }));
// Use the 'index' route for the root path.
app.use('/', index);
// Use the 'users' route for '/users' path.
app.use('/users', users);
// Add more routes after importing...

module.exports = { app, request };
