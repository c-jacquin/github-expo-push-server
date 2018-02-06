import 'jest';
import * as nock from 'nock';
import * as supertest from 'supertest';
import { app } from '../../../app';

const request = supertest.agent(app.listen());

describe('Auth api without mocking Github service', () => {
  it('should respond with a tranlated error message if github service fail', async () => {
    const scope = nock('https://github.com/login/oauth')
      .post('/access_token')
      .reply(400);

    await request
      .post('/auth')
      .send({ code: 'testCode', clientId: 'testClientId' })
      .expect(400);
  });
});
