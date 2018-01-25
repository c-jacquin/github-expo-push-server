import { Logger } from '../Logger'
import { EntitySchema, MongoEntityManager } from 'typeorm'

import { User } from '../../entity/User'

export class PushNotification {
  logger: Logger
  dbClient: MongoEntityManager
  expo: any

  constructor({ expo, logger, dbClient }) {
    this.logger = logger
    this.dbClient = dbClient
    this.expo = expo
  }

  async dispatchNotifications(notification: any) {
    const users = await this.dbClient.find<User>('User')
    const messages = []

    for (const { login, pushToken } of users) {
      if (login === notification.sender.login) {
        messages.push({
          to: pushToken,
          sound: 'default',
          body: 'This is a test notification',
          data: { yeah: 'yeah' },
        })
      }
    }

    const chunks = this.expo.chunkPushNotifications(messages)

    for (const chunk of chunks) {
      const receipts = await this.expo.sendPushNotificationsAsync(chunk)

      this.logger.info(
        `Push Notification => ${notification.sender.login}`,
        receipts,
      )
    }
  }
}
