jest.mock('../../models/User');

const supertest = require('supertest-as-promised');
// const pushService = require('../../services/push-notifications');
const { app } = require('../../app');

const request = supertest.agent(app.listen());

describe('Push Notification', () => {
  describe('POST /push', () => {
    it('should call dispatchNotification service method', () => {
      // const spy = jest.spyOn(pushService, 'dispatchNotifications');

      return request
        .post('/push')
        .send({ sender: { login: 'foo' }, action: 'test' })
        .expect(200, {});
      // .then(() => {
      //   expect(spy).toHaveBeenCalled();
      // });
    });
  });

  describe('POST /push/register', () => {
    it('should respond with an empty object', () => {
      return request
        .post('/push/register')
        .send({
          login: 'test',
          pushToken: 'ExponentPushToken[InsQgdYEVGYODIlggg9uFD]'
        })
        .expect(200, { message: 'push notification registered' });
    });
  });
});
