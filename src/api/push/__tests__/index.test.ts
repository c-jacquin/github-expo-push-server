import 'jest';
import * as supertest from 'supertest';
import { app } from '../../../app';
import { connectDatabase } from '../../../database';
import { PushNotification } from '../../../services/PushNotification';

const request = supertest.agent(app.listen());

jest.mock('../../../services/Github');
jest.mock('../../../services/Http');
jest.mock('../../../services/PushNotification');

describe('Push Notification', () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  describe('POST /push', () => {
    it('should respond with a success message', async () => {
      const spy = jest.spyOn(
        PushNotification.prototype,
        'dispatchNotifications',
      );

      await request
        .post('/push')
        .send({
          action: 'edited',
          issue: { user: {} },
          repository: { owner: {} },
          sender: { login: 'test' },
        })
        .expect(200, {});

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('POST /push/register', () => {
    it('should respond with a success message', async () => {
      const response = await request
        .post('/push/register')
        .set({ authorization: 'token' })
        .send({
          login: 'test',
          pushToken: 'ExponentPushToken[InsQgdYEVGYODIlggg9uFD]',
        })
        .expect(200);

      expect(response.body.message).toBe(
        'Succesfully subscribe to push notifications.',
      );
    });
  });

  describe('PUT /push/profile', () => {
    it('should respond with a success message', () => {
      return request
        .put('/push/profile')
        .set({ authorization: 'token' })
        .send({
          login: 'test',
          profile: {
            pushCommit: false,
            pushEnabled: true,
            pushIssue: true,
            pushPr: false,
          },
        })
        .expect(200, {
          message: 'profile updated.',
          profile: {
            pushCommit: false,
            pushEnabled: true,
            pushIssue: true,
            pushPr: false,
          },
        });
    });
  });
});
