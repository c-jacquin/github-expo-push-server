import { GithubUser } from './GithubUser';

/* tslint:disable */
export class GithubNotification {
  public branches: any;
  public created_at: string;
  public updated_at: string;
  public context: string;
  public sha: string;
  public description: string;
  public id: string;
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
  public pull_request: any;
  public commit: any;
  public type: string;
  public repository: {
    id: string;
    full_name: string;
    owner: GithubUser;
    url: string;
    language: string;
    stargazers: string;
  };
  public state: string;
}
