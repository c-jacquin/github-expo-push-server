import 'jest'
import * as nock from 'nock'
import * as uuid from 'uuid'

import { Http } from '../Http'
import { Logger } from '../Logger'
import { Env } from '../Env'

describe('Http service', () => {
  let http: Http
  const env = new Env()

  beforeEach(() => {
    http = new Http(new Logger(env), { requestId: uuid() })
  })

  afterAll(() => {
    nock.cleanAll()
  })

  it('post => should make a POST http call to the given url with the given body.', async () => {
    const scope = nock('https://foo')
      .post('/bar')
      .reply(200, {
        test: 'test',
      })

    const { data } = await http.post('https://foo/bar', {})

    scope.done()
    expect(data.test).toBe('test')
  })

  it('put => should make a PUT http call to the given url with the given body.', async () => {
    const scope = nock('https://foo')
      .put('/bar')
      .reply(200, {
        test: 'test',
      })

    const { data } = await http.put('https://foo/bar', {})

    scope.done()
    expect(data.test).toBe('test')
  })

  it('should fail', async () => {
    const scope = nock('https://foo')
      .get('/bar')
      .reply(404)
    try {
      await http.get('https://foo/bar')
      scope.done()
    } catch (err) {}
  })
})
