const { app, request } = require('./testUtils');

describe('user', () => {
  describe('get user route', () => {
    describe('given the user route does not exist', () => {
      it('should return a 404', (done) => {
        request(app).get('/user/unknown').expect(404, done);
        // expect(true).toBe(true);
      });
      it('should return searchedUser undefined', (done) => {
        request(app)
          .get('/user/unknown')
          .expect((res) => {
            expect(res.body.searchedUser).toBeUndefined();
          })
          .expect(404, done);
      });
      it('should return error message', (done) => {
        request(app)
          .get('/user/unknown')
          .expect((res) => {
            expect(res.body.error).toBe('User does not exist');
          })
          .expect(404, done);
      });
    });
    describe('given the user route does exist', () => {
      it('should return a 200', (done) => {
        request(app).get('/user/1').expect(200, done);
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
        request(app)
          .get('/user/2')
          .expect((res) => {
            expect(res.body.searchedUser).toBeDefined();
          })
          .expect(200, done);
      });
    });
  });
  describe('post user route', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/user')
        .type('form')
        .send({ id: 3, name: 'John' })
        .then(() => {
          request(app)
            .get('/user')
            .expect(
              {
                allUsers: [
                  {
                    id: 1,
                    name: 'Peter',
                  },
                  {
                    id: 2,
                    name: 'Michael',
                  },
                  {
                    id: 3,
                    name: 'John',
                  },
                ],
              },
              done
            );
        });
    });
    it('should return 422 and error if username is already taken', (done) => {
      request(app)
        .post('/user')
        .type('form')
        .send({ id: 4, name: 'Peter' })
        .expect((res) => {
          expect(res.body.error).toBe('Username already exists');
        })
        .expect(422, done);

      // expect(true).toBe(true);
    });
  });
});
