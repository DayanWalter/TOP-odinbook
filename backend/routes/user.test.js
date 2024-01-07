const { app, request } = require('./testUtils');
describe('user', () => {
  describe('get user route', () => {
    describe('given the user route does not exist', () => {
      it('should return a 404', (done) => {
        request(app).get('/unknown').expect(404, done);
        // expect(true).toBe(true);
      });
    });
    describe('given the user route does exist', () => {
      it('should return a 200', (done) => {
        request(app).get('/').expect(200, done);
        // expect(true).toBe(true);
      });
    });
  });
});
