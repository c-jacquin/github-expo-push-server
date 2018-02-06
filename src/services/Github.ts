import { Env } from './Env';
import { Http } from './Http';
import { GithubUser } from './models/GithubUser';

export class Github {
  constructor(private env: Env, private http: Http) {}

  public async getToken(code: string, clientId: string): Promise<string> {
    const result = await this.http.post(this.env.GITHUB_TOKEN_URI, {
      accept: 'json',
      client_id: clientId,
      client_secret: this.env.GITHUB_SECRET,
      code,
    });
    return result.data.split('=')[1].split('&')[0];
  }

  public async getUser(token: string): Promise<GithubUser> {
    const result = await this.http.get(this.env.GITHUB_API + '/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    });

    return result.data;
  }
}
