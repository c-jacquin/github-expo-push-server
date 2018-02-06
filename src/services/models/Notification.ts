import { I18n } from '../I18n'
import { GithubUser } from './GithubUser'
import { GithubNotification } from './GithubNotification'

export class Notification {
  static supportedNotifications = ['commit', 'issue']

  public to: string
  public body: string
  public sound = 'default'
  public data: any

  constructor(to: string, data: GithubNotification, private i18n: I18n) {
    const type = this.getType(data)
    this.to = to

    if (data.issue) {
      this.body = i18n.translate('notification.body', {
        action: i18n.translate(`notification.${data.action}`),
        title: data.issue.title,
        type: this.i18n.translate(`notification.type.${type}`),
        user: this.formatUser(data.issue.user).login,
      })

      this.data = {
        id: data.issue.id,
        action: data.action,
        type,
        url: data.issue.url,
        title: data.issue.title,
        user: this.formatUser(data.issue.user),
        createdAt: data.issue.created_at,
        updatedAt: data.issue.updated_at,
        authorAssociation: data.issue.author_association,
        repository: {
          id: data.repository.id,
          name: data.repository.full_name,
          owner: this.formatUser(data.repository.owner),
          url: data.repository.url,
          language: data.repository.language,
          stargazers: data.repository.stargazers,
        },
      }
    }
  }

  private getType(data): string {
    let type = ''

    if (data.issue) {
      type = 'issue'
    } else if (data.commit) {
      type = 'commit'
    }

    if (!Notification.supportedNotifications.includes(type)) {
      throw new Error('unsuported notification')
    }

    return type
  }

  private formatUser(user: GithubUser) {
    return {
      id: user.id,
      login: user.login,
      avatarurl: user.avatar_url,
    }
  }
}
