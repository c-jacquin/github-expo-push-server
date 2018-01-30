import 'jest'
import * as supertest from 'supertest'
import { app } from '../../../app'
import { Github } from '../../../services/Github'
jest.mock('../../../services/Github')

const request = supertest.agent(app.listen())

describe('Authentication', () => {
  describe('POST /auth', () => {
    it('should call the github getToken method', async () => {
      const spy = jest.spyOn(Github.prototype, 'getToken')

      await request
        .post('/auth')
        .send({ code: 'testCode', clientId: 'testClientId' })
        .expect(200, {
          token: 'test',
        })

      expect(spy).toHaveBeenCalledWith('testCode', 'testClientId')
    })

    it('should respond an error if no code is provided in the body', async () => {
      await request.post('/auth').expect(400)
    })

    it('should respond an error if code is not a string', async () => {
      await request
        .post('/auth')
        .send({ code: true })
        .expect(400)
    })
  })
})
