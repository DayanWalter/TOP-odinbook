const { app, request } = require('./testUtils');

describe('user', () => {
  describe('get user route', () => {
    describe('given the user route does not exist', () => {
      it('should return a 404', (done) => {
        request(app).get('/user/unknown').expect(404, done);
        // expect(true).toBe(true);
      });
    });
    describe('given the user route does exist', () => {
      it('should return a 200', (done) => {
        request(app).get('/user').expect(200, done);
        // expect(true).toBe(true);
      });
      it('should return allUsers object', (done) => {
        request(app)
          .get('/user')
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body).toEqual({
              allUsers: expect.any(Array),
            });
          })
          .expect(200, done);
      });
      it('should return user object', (done) => {
        request(app).get('/user/1').expect(200, done);
      });
    });
  });
  describe('post user route', () => {
    it('should create a new user', (done) => {
      request(app).post('/user').expect(200, done);
    });
    it.todo('should return new user object');
  });
});
