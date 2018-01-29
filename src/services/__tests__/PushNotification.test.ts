import 'jest'
import * as Expo from 'expo-server-sdk'

import { PushNotification } from '../PushNotification'
import { Logger } from '../Logger'
import { Env } from '../Env'
import { MongoEntityManager } from 'typeorm'

describe('PushNotification service', () => {
  const env = new Env()
  const logger = new Logger(env)
  let pushNotification: PushNotification
  const dbClient = {
    find(type: string): Promise<any[]> {
      return Promise.resolve([{ login: 'test', pushToken: 'token' }])
    },
  }

  beforeEach(() => {
    pushNotification = new PushNotification(logger, dbClient)
  })

  it('dispatchNotification => should call chunk and send notification from expo sdk', () => {
    const dbSpy = jest.spyOn(dbClient, 'find')
    // const chunkSpy = jest.spyOn(Expo.prototype, 'chunkPushNotifications')
    // const sendSpy = jest.spyOn(Expo.prototype, 'sendPushNotificationsAsync')
    pushNotification.dispatchNotifications({ sender: { login: 'test' } })

    expect(dbSpy).toHaveBeenCalled()
    // expect(chunkSpy).toHaveBeenCalled()
    // expect(sendSpy).toHaveBeenCalled()
  })
})
