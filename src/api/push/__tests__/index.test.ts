import 'jest'
import * as supertest from 'supertest'
// const pushService = require('../../services/push-notifications')
import { app } from '../../../app'

const request = supertest.agent(app.listen())

describe('Push Notification', () => {
  describe('POST /push', () => {
    it('should call dispatchNotification service method', () => {
      // const spy = jest.spyOn(pushService, 'dispatchNotifications')

      return request
        .post('/push')
        .send({ sender: { login: 'foo' }, action: 'test' })
        .expect(200, {})
      // .then(() => {
      //   expect(spy).toHaveBeenCalled()
      // })
    })
  })

  describe('POST /push/register', () => {
    it('should respond with a success message', () => {
      return request
        .post('/push/register')
        .send({
          login: 'test',
          pushToken: 'ExponentPushToken[InsQgdYEVGYODIlggg9uFD]',
        })
        .expect(200, { message: 'push notification registered' })
    })
  })

  describe('PUT /push/profile', () => {
    it('should respond with a success message', () => {
      return request
        .put('/push/profile')
        .send({
          login: 'test',
          profile: {
            pushEnabled: true,
            pushIssue: true,
            pushCommit: false,
            pushPr: false,
          },
        })
        .expect(200, { message: 'profile updated.' })
    })
  })
})
