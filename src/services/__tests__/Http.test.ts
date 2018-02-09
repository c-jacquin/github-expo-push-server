import 'jest';
import * as nock from 'nock';
import * as uuid from 'uuid';
import { transports } from 'winston';

import { Env } from '../Env';
import { Http } from '../Http';
import { Logger } from '../Logger';

describe('Http service', () => {
  let http: Http;
  const env = new Env();

  beforeEach(() => {
    http = new Http({ requestId: uuid() }, env);
  });

  afterAll(() => {
    nock.cleanAll();
  });

  it('should use the file logger in production', () => {
    env.NODE_ENV = 'production';
    http = new Http({ requestId: uuid() }, env);
    env.NODE_ENV = 'test';
    expect(http.logger.transports.file).toBeInstanceOf(transports.File);
  });

  it('post => should make a POST http call to the given url with the given body.', async () => {
    const scope = nock('https://foo')
      .post('/bar')
      .reply(200, {
        test: 'test',
      });

    const { data } = await http.post('https://foo/bar', {});

    scope.done();
    expect(data.test).toBe('test');
  });

  it('put => should make a PUT http call to the given url with the given body.', async () => {
    const scope = nock('https://foo')
      .put('/bar')
      .reply(200, {
        test: 'test',
      });

    const { data } = await http.put('https://foo/bar', {});

    scope.done();
    expect(data.test).toBe('test');
  });

  it('should fail', async () => {
    const scope = nock('https://foo')
      .get('/bar')
      .reply(404);
    try {
      await http.get('https://foo/bar');
      scope.done();
      /* tslint:disable */
    } catch {}
  });
});
