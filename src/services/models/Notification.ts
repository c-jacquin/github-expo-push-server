import { I18n } from '../I18n';
import { GithubNotification } from './GithubNotification';
import { GithubUser } from './GithubUser';

export class Notification {
  public static supportedNotifications = ['commit', 'issue'];

  public to: string;
  public body: string;
  public sound = 'default';
  public data: any;

  constructor(to: string, data: GithubNotification, private i18n: I18n) {
    const type = this.getType(data);
    this.to = to;

    if (data.issue) {
      this.body = i18n.translate('notification.body', {
        action: i18n.translate(`notification.${data.action}`),
        title: data.issue.title,
        type: this.i18n.translate(`notification.type.${type}`),
        user: this.formatUser(data.issue.user).login,
      });

      this.data = {
        action: data.action,
        authorAssociation: data.issue.author_association,
        createdAt: data.issue.created_at,
        id: data.issue.id,
        repository: {
          id: data.repository.id,
          language: data.repository.language,
          name: data.repository.full_name,
          owner: this.formatUser(data.repository.owner),
          stargazers: data.repository.stargazers,
          url: data.repository.url,
        },
        title: data.issue.title,
        type,
        updatedAt: data.issue.updated_at,
        url: data.issue.url,
        user: this.formatUser(data.issue.user),
      };
    }
  }

  private getType(data): string {
    let type = '';

    if (data.issue) {
      type = 'issue';
    } else if (data.commit) {
      type = 'commit';
    }

    if (!Notification.supportedNotifications.includes(type)) {
      throw new Error('unsuported notification');
    }

    return type;
  }

  private formatUser(user: GithubUser) {
    return {
      avatarurl: user.avatar_url,
      id: user.id,
      login: user.login,
    };
  }
}
