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
      it('should return 200', (done) => {
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
        .send({
          id: 3,
          user_name: 'John',
          email: 'John@mail.com',
          password: '123',
        })
        .then(() => {
          request(app)
            .get('/user')
            .expect(
              {
                allUsers: [
                  {
                    id: 1,
                    user_name: 'Peter',
                    email: 'Peter@mail.com',
                    password: '123',
                    img_url: 'http://example.com',
                    follower_id: [],
                    follows_id: [],
                    posts_id: [],
                    comments_id: [],
                    reg_date: '12:00',
                  },
                  {
                    id: 2,
                    user_name: 'Michael',
                    email: 'Michael@mail.com',
                    password: '123',
                    img_url: 'http://example.com',
                    follower_id: [],
                    follows_id: [],
                    posts_id: [],
                    comments_id: [],
                    reg_date: '12:00',
                  },
                  {
                    id: 3,
                    user_name: 'John',
                    email: 'John@mail.com',
                    password: '123',
                    img_url: 'http://example.com',
                    follower_id: [],
                    follows_id: [],
                    posts_id: [],
                    comments_id: [],
                    reg_date: '12:00',
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
        .send({ id: 4, user_name: 'Peter' })
        .expect((res) => {
          expect(res.body.error).toBe('Username already exists');
        })
        .expect(422, done);

      // expect(true).toBe(true);
    });
    it('should return 422 and error if email is already taken', (done) => {
      request(app)
        .post('/user')
        .type('form')
        .send({ email: 'Peter@mail.com' })
        .expect((res) => {
          expect(res.body.error).toBe('Email already exists');
        })
        .expect(422, done);

      // expect(true).toBe(true);
    });
  });
  describe('put user route', () => {
    describe('given the user does not exist', () => {
      it('should return 404', (done) => {
        request(app).put('/user/unknown').expect(404, done);
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
          .put('/user/unknown')
          .expect((res) => {
            expect(res.body.error).toBe('User does not exist');
          })
          .expect(404, done);
      });
    });
    describe('given the user does exist', () => {
      it('should return 200', (done) => {
        request(app).put('/user/1').expect(200, done);
      });
      it('should change userdata', (done) => {
        request(app)
          .put('/user/1')
          .type('form')
          .send({
            email: 'Peter2@mail.com',
          })
          .expect((res) => {
            expect(res.body.changedUser).toStrictEqual({
              id: 1,
              user_name: 'Peter',
              email: 'Peter2@mail.com',
              password: '123',
              img_url: 'http://example.com',
              follower_id: [],
              follows_id: [],
              posts_id: [],
              comments_id: [],
              reg_date: '12:00',
            });
          })
          .expect(200, done);
      });
    });
  });

  describe('delete user route', () => {
    describe('given the user does not exist', () => {
      it('should return 404', (done) => {
        request(app).delete('/user/unknown').expect(404, done);
      });
      it('should return error message', (done) => {
        request(app)
          .delete('/user/unknown')
          .expect((res) => {
            expect(res.body.error).toBe('User does not exist');
          })
          .expect(404, done);
      });
    });
    describe('given the user does exist', () => {
      it('should return 200', (done) => {
        request(app).delete('/user/1').expect(200, done);
      });
      it('should return correct deleted userdata', (done) => {
        request(app)
          .delete('/user/1')
          .expect((res) => {
            expect(res.body.deletedUser).toStrictEqual({
              id: 1,
              user_name: 'Peter',
              email: 'Peter@mail.com',
              password: '123',
              img_url: 'http://example.com',
              follower_id: [],
              follows_id: [],
              posts_id: [],
              comments_id: [],
              reg_date: '12:00',
            });
          })
          .expect(200, done);
      });
    });
  });
});
