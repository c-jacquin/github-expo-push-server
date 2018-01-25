import { Env } from '../Env'
import { Http } from '../Http'

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
}
