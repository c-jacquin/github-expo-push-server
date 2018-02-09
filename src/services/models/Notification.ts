import { I18n } from '../I18n';
import { IGithubNotification } from './GithubNotification';
import { IGithubUser } from './GithubUser';
import { NotificationType } from './NotificationType';

export class Notification {
  public to: string;
  public body: string;
  public sound = 'default';
  public data: { type: string };

  constructor(to: string, data: IGithubNotification, private i18n: I18n) {
    const type = this.getType(data);
    this.to = to;

    switch (type) {
      case NotificationType.ISSUE:
        this.body = i18n.translate('notification.body', {
          action: i18n.translate(`notification.${data.action}`),
          title: data.issue.title,
          type: this.i18n.translate(`notification.type.${type}`),
          user: this.formatUser(data.issue.user).login,
        });

        this.data = this.formateIssueData(data);
        break;

      case NotificationType.PULL_REQUEST:
        this.body = i18n.translate('notification.body', {
          action: i18n.translate(`notification.${data.action}`),
          title: data.issue.title,
          type: this.i18n.translate(`notification.type.${type}`),
          user: this.formatUser(data.issue.user).login,
        });

        this.data = this.formatPullRequestdata(data);
        break;

      case NotificationType.COMMIT:
        this.body = i18n.translate('notification.body', {
          action: i18n.translate(`notification.${data.action}`),
          title: data.issue.title,
          type: this.i18n.translate(`notification.type.${type}`),
          user: this.formatUser(data.issue.user).login,
        });

        this.data = this.formatCommitdata(data);
        break;
    }
  }

  private getType(data): string {
    let type = '';

    if (data.issue) {
      type = NotificationType.ISSUE;
    } else if (data.commit) {
      type = NotificationType.COMMIT;
    } else if (data.pull_request) {
      type = NotificationType.PULL_REQUEST;
    } else {
      throw new Error('notification.unsuported');
    }

    return type;
  }

  private formatUser(user: IGithubUser) {
    return {
      avatarurl: user.avatar_url,
      id: user.id,
      login: user.login,
    };
  }

  private formatRepository(repository: any) {
    return {
      id: repository.id,
      language: repository.language,
      name: repository.full_name,
      owner: this.formatUser(repository.owner),
      stargazers: repository.stargazers,
      url: repository.url,
    };
  }

  private formateIssueData(data: IGithubNotification) {
    return {
      action: data.action,
      authorAssociation: data.issue.author_association,
      createdAt: data.issue.created_at,
      id: data.issue.id,
      repository: this.formatRepository(data.repository),
      title: data.issue.title,
      type: this.getType(data),
      updatedAt: data.issue.updated_at,
      url: data.issue.url,
      user: this.formatUser(data.issue.user),
    };
  }

  private formatCommitdata(data: IGithubNotification) {
    return {
      branches: data.branches,
      commit: data.commit.commit,
      commiter: this.formatUser(data.commit.commiter),
      context: data.context,
      createdAt: data.created_at,
      description: data.description,
      id: data.id,
      repository: this.formatRepository(data.repository),
      sha: data.sha,
      state: data.state,
      type: this.getType(data),
      updatedAt: data.updated_at,
    };
  }

  private formatPullRequestdata(data: IGithubNotification) {
    return {
      action: data.action,
      additions: data.pull_request.additions,
      authorAssociation: data.pull_request.author_association,
      base: data.pull_request.base,
      changedFiles: data.pull_request.changedFiles.changed_files,
      comments: data.pull_request.comments,
      commits: data.pull_request.commits,
      createdAt: data.pull_request.created_at,
      deletions: data.pull_request.deletions,
      head: data.pull_request.head,
      id: data.pull_request.id,
      mergeCommitSha: data.pull_request.merge_commit_sha,
      mergedBy: this.formatUser(data.pull_request.merged_by),
      repository: this.formatRepository(data.repository),
      reviewComments: data.pull_request.review_comments,
      state: data.state,
      title: data.pull_request.title,
      type: this.getType(data),
      updatedAt: data.pull_request.updated_at,
      url: data.pull_request.url,
      user: this.formatUser(data.pull_request.user),
    };
  }
}
