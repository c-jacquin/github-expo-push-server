import 'jest'
import * as supertest from 'supertest'
import { PushNotification } from '../../../services/PushNotification'
import { app } from '../../../app'

const request = supertest.agent(app.listen())

jest.mock('../../../services/Github')
jest.mock('../../../services/Http')
// jest.mock('../../../services/PushNotification')

describe('Push Notification', () => {
  describe('POST /push', () => {
    beforeEach(() => {
      process.env.TEST_FAILS = undefined
    })
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

    it('should respond with a tranlated error message if pushNotification service fail', () => {
      process.env.TEST_FAIL = 'true'

      return request
        .post('/push')
        .send({ action: 'test', sender: { login: 'test' } })
        .expect(400)
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
        .expect(200, {
          message: 'Succesfully subscribe to push notifications.',
        })
    })
  })

  describe('PUT /push/profile', () => {
    beforeEach(() => {
      process.env.TEST_FAIL = undefined
    })

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

    it('should respond with an error message and 404 status', async () => {
      process.env.TEST_FAIL = 'true'

      const response = await request
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
        .expect(400)

      // console.log(response)
    })
  })
})
