import { GithubUser } from '../helpers/GithubUser'

export class Github {
  async getToken(code: string, clientId: string): Promise<string> {
    return Promise.resolve('test')
  }

  async getUser(token: string): Promise<GithubUser> {
    return Promise.resolve({ id: 12, login: 'test' })
  }
}
