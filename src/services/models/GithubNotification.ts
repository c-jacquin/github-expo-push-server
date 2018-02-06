import { GithubUser } from './GithubUser'

export class GithubNotification {
  issue: {
    id: string
    url: string
    title: string
    user: GithubUser
    created_at: string
    updated_at: string
    author_association: string
  }
  action: string
  type: string
  repository: {
    id: string
    full_name: string
    owner: GithubUser
    url: string
    language: string
    stargazers: string
  }
}
