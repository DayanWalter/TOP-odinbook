// Import app and request from testUtils.js
const { app, request } = require('./testUtils');

// Describe block for testing the GET route '/'
describe('GET /', () => {
  // Test case: Index route should return the title
  it('Index route returns title', (done) => {
    // Making a GET request to the '/' endpoint using the 'request' function
    request(app)
      // Expecting the response to have 'Content-Type' header of type JSON
      .expect('Content-Type', /json/)
      // Expecting the response body to be { title: 'Express' }
      .expect({ title: 'Express' })
      // Expecting the HTTP status code to be 200
      .expect(200, done);
  });
});
