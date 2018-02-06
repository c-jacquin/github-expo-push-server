import * as Expo from 'expo-server-sdk';
import { MongoEntityManager, MongoRepository } from 'typeorm';

import { User } from '../entity/User';
import { I18n } from './I18n';
import { Logger } from './Logger';
import { Notification } from './models/Notification';

const expo = new Expo();

export class PushNotification {
  constructor(
    private logger: Logger,
    private userRepository: MongoRepository<User>,
    private i18n: I18n,
  ) {}

  public async dispatchNotifications(notification: any): Promise<void> {
    const users = await this.userRepository.find();
    const messages = [];

    for (const { login, pushToken } of users) {
      if (login === notification.sender.login) {
        messages.push(new Notification(pushToken, notification, this.i18n));
      }
    }
    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      const receipts = await expo.sendPushNotificationsAsync(chunk);
      this.logger.info(
        `Push Notification => ${notification.sender.login}`,
        receipts,
      );
    }
  }
}
