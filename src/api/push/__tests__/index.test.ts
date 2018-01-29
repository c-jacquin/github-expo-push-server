import 'jest'
import * as supertest from 'supertest'
import { PushNotification } from '../../../services/PushNotification'
import { app } from '../../../app'

const request = supertest.agent(app.listen())

jest.mock('../../../services/Github')
jest.mock('../../../services/Http')
jest.mock('../../../services/PushNotification')

describe('Push Notification', () => {
  describe('POST /push', () => {
    it('should respond with a success message', async () => {
      const spy = jest.spyOn(
        PushNotification.prototype,
        'dispatchNotifications',
      )

      await request
        .post('/push')
        .send({ sender: { login: 'foo' }, action: 'test' })
        .expect(200, {})

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('POST /push/register', () => {
    it('should respond with a success message', () => {
      return request
        .post('/push/register')
        .set({ authorization: 'token' })
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
        .set({ authorization: 'token' })
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
