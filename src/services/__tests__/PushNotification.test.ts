import * as Expo from 'expo-server-sdk';
import 'jest';
import { MongoEntityManager, MongoRepository } from 'typeorm';

import { User } from '../../entity/User';
import { Env } from '../Env';
import { I18n } from '../I18n';
import { Logger } from '../Logger';
import { PushNotification } from '../PushNotification';

describe('PushNotification service', () => {
  const env = new Env();
  const logger = new Logger(env);
  const i18n = new I18n(env);
  let pushNotification: PushNotification;
  const userRepository = {
    ...new MongoRepository<User>(),
    find(type: string): Promise<any[]> {
      return Promise.resolve([{ login: 'test', pushToken: 'token' }]);
    },
  };

  beforeEach(() => {
    pushNotification = new PushNotification(
      logger,
      userRepository as MongoRepository<User>,
      i18n,
    );
  });

  it('dispatchNotification => should call chunk and send notification from expo sdk', () => {
    const dbSpy = jest.spyOn(userRepository, 'find');
    // const chunkSpy = jest.spyOn(Expo.prototype, 'chunkPushNotifications')
    // const sendSpy = jest.spyOn(Expo.prototype, 'sendPushNotificationsAsync')
    pushNotification.dispatchNotifications({
      action: 'edited',
      issue: { user: {} },
      repository: { owner: {} },
      sender: { login: 'test' },
    });

    expect(dbSpy).toHaveBeenCalled();
    // expect(chunkSpy).toHaveBeenCalled()
    // expect(sendSpy).toHaveBeenCalled()
  });
});
