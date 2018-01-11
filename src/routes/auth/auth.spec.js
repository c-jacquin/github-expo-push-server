const supertest = require('supertest-as-promised');
const nock = require('nock');
const { app } = require('../../app');

const request = supertest.agent(app.listen());

describe('Authentication', () => {
  describe('POST /auth', () => {
    it('should call the github oAuth endpoint', () => {
      nock('https://github.com/login/oauth')
        .post('/access_token')
        .reply(200, {
          access_token: '123ABC',
        });

      return request
        .post('/auth')
        .send({ code: 'testcode' })
        .expect(200, {
          token: '123ABC',
        });
    });

    it('should respond an error if no code is provided in the body', () => {
      return request.post('/auth').expect(400);
    });

    it('should respond an error if code is not a string', () => {
      return request
        .post('/auth')
        .send({ code: true })
        .expect(400);
    });
  });
});
