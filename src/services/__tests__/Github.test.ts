import 'jest'
import * as nock from 'nock'
import * as uuid from 'uuid'

import { Github } from '../Github'
import { Env } from '../Env'
import { Http } from '../Http'
import { Logger } from '../Logger'

describe('Github service', () => {
  const env = new Env()
  let githubService: Github

  beforeEach(() => {
    githubService = new Github(
      env,
      new Http(new Logger(env), { requestId: uuid() }),
    )
  })

  afterAll(() => {
    nock.cleanAll()
  })

  it('getToken => should fetch a github token', async () => {
    const scope = nock('https://github.com/login/oauth')
      .post('/access_token')
      .reply(200, 'access_token=123ABC&')

    const token = await githubService.getToken('code', 'clientId')

    scope.done()
    expect(token).toBe('123ABC')
  })

  it('getUser => should fetch the user corresponding to the given token', async () => {
    const scope = nock('https://api.github.com')
      .get('/user')
      .reply(200, {
        id: 1234,
        login: 'mylogin',
      })

    const user = await githubService.getUser('123ABC')
    scope.done()
    expect(user.login).toBe('mylogin')
  })
})
