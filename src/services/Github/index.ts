import { Env } from '../Env'
import { Http } from '../Http'
import { GithubUser } from './GithubUser'

export class Github {
  env: Env
  http: Http

  constructor({ env, http }) {
    this.env = env
    this.http = http
  }

  async getToken(code: string, clientId: string): Promise<string> {
    const result = await this.http.post(this.env.GITHUB_TOKEN_URI, {
      client_id: clientId,
      client_secret: this.env.GITHUB_SECRET,
      code,
      accept: 'json',
    })

    return result.data.access_token
  }

  async getUser(token: string): Promise<GithubUser> {
    const result = await this.http.get(this.env.GITHUB_API + '/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    })

    return result.data
  }
}
