import * as Expo from 'expo-server-sdk';
import 'jest';
import { MongoEntityManager, MongoRepository } from 'typeorm';

import { User } from '../../entity/User';
import { Env } from '../Env';
import { I18n } from '../I18n';
import { Logger } from '../Logger';
import { PushNotification } from '../PushNotification';

jest.mock('../models/Notification');

describe('PushNotification service', () => {
  const env = new Env();
  const logger = new Logger(env);
  const i18n = new I18n(env);
  let pushNotification: PushNotification;

  describe('Issue notification', () => {
    const userRepository = {
      ...new MongoRepository<User>(),
      find(type: string): Promise<any[]> {
        return Promise.resolve([
          {
            login: 'test',
            pushEnabled: true,
            pushIssue: true,
            pushToken: 'token',
          },
        ]);
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

      pushNotification.dispatchNotifications({
        action: 'edited',
        issue: { user: {} },
        repository: { owner: {} },
        sender: { login: 'test' },
        type: 'issue',
      });

      expect(dbSpy).toHaveBeenCalled();
    });
  });

  describe('Commit notification', () => {
    const userRepository = {
      ...new MongoRepository<User>(),
      find(type: string): Promise<any[]> {
        return Promise.resolve([
          {
            login: 'test',
            pushCommit: true,
            pushEnabled: true,
            pushToken: 'token',
          },
        ]);
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

      pushNotification.dispatchNotifications({
        action: 'edited',
        commit: { user: {} },
        repository: { owner: {} },
        sender: { login: 'test' },
        type: 'commit',
      });

      expect(dbSpy).toHaveBeenCalled();
    });
  });

  describe('Pull request notification', () => {
    const userRepository = {
      ...new MongoRepository<User>(),
      find(type: string): Promise<any[]> {
        return Promise.resolve([
          {
            login: 'test',
            pushEnabled: true,
            pushPr: true,
            pushToken: 'token',
          },
        ]);
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

      pushNotification.dispatchNotifications({
        action: 'edited',
        pull_request: { user: {} },
        repository: { owner: {} },
        sender: { login: 'test' },
        type: 'pull-request',
      });

      expect(dbSpy).toHaveBeenCalled();
    });
  });
});
