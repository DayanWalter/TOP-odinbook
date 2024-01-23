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
module.exports = main;
