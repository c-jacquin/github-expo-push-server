import * as Expo from 'expo-server-sdk'
import { MongoEntityManager, MongoRepository } from 'typeorm'

import { Logger } from './Logger'
import { User } from '../entity/User'
import { Notification } from './models/Notification'
import { I18n } from './I18n'
const expo = new Expo()

export class PushNotification {
  constructor(
    private logger: Logger,
    private userRepository: MongoRepository<User>,
    private i18n: I18n,
  ) {}

  async dispatchNotifications(notification: any): Promise<void> {
    // console.log(notification)
    const users = await this.userRepository.find()
    const messages = []

    for (const { login, pushToken } of users) {
      if (login === notification.sender.login) {
        messages.push(new Notification(pushToken, notification, this.i18n))
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
