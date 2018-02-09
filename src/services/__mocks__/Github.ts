import { IGithubUser } from '../models/IGithubUser';

export class Github {
  public async getToken(code: string, clientId: string): Promise<string> {
    return Promise.resolve('test');
  }

  public async getUser(token: string): Promise<IGithubUser> {
    return Promise.resolve({ id: 12, login: 'test' });
  }
}
