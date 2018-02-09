import { IGithubUser } from './GithubUser';

export interface IGithubNotification {
  branches: any;
  created_at: string;
  updated_at: string;
  context: string;
  sha: string;
  description: string;
  id: string;
  issue: {
    id: string;
    url: string;
    title: string;
    user: IGithubUser;
    created_at: string;
    updated_at: string;
    author_association: string;
  };
  action: string;
  pull_request: any;
  commit: any;
  type: string;
  repository: {
    id: string;
    full_name: string;
    owner: IGithubUser;
    url: string;
    language: string;
    stargazers: string;
  };
  state: string;
}
