import * as Expo from 'expo-server-sdk'
import { EntitySchema, MongoEntityManager } from 'typeorm'

import { Logger } from './Logger'
import { User } from '../entity/User'

const expo = new Expo()

export class PushNotification {
  constructor(
    private logger: Logger,
    private dbClient: Partial<MongoEntityManager>,
  ) {}

  async dispatchNotifications(notification: any): Promise<void> {
    const users = await this.dbClient.find<User>('User')
    const messages = []

    for (const { login, pushToken } of users) {
      /* istanbul ignore next */
      if (login === notification.sender.login) {
        messages.push({
          to: pushToken,
          sound: 'default',
          body: 'This is a test notification',
          data: { yeah: 'yeah' },
        })
      }
    }

    const chunks = expo.chunkPushNotifications(messages)

    for (const chunk of chunks) {
      const receipts = await expo.sendPushNotificationsAsync(chunk)

      this.logger.info(
        `Push Notification => ${notification.sender.login}`,
        receipts,
      )
    }
  }
}
