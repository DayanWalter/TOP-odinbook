const { app, request } = require('./testUtils');

describe('GET /', () => {
  it('Index route returns title', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect({ index: 'get' })
      .expect(200, done);
  });
});

describe('POST /api/signup', () => {
  describe('User sign up process', () => {
    // TODO: test the signup process
  });
});
