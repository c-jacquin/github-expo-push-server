import { GithubUser } from './GithubUser';

export class GithubNotification {
  public issue: {
    id: string;
    url: string;
    title: string;
    user: GithubUser;
    created_at: string;
    updated_at: string;
    author_association: string;
  };
  public action: string;
  public type: string;
  public repository: {
    id: string;
    full_name: string;
    owner: GithubUser;
    url: string;
    language: string;
    stargazers: string;
  };
}
