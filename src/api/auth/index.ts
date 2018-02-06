import { before, route, POST } from 'awilix-koa'
import * as check from 'check-types'

import { validateParams } from '../../middlewares/validate-params'
import { Github } from '../../services/Github'

@route('/auth')
export default class AuthApi {
  constructor(private github: Github) {}

  @POST()
  @before([validateParams(['request', 'body'], ['code'], check.string)])
  async oAuthLogin(ctx) {
    try {
      const token = await this.github.getToken(
        ctx.request.body.code,
        ctx.request.body.clientId,
      )

      ctx.body = { token }
    } catch (err) {
      ctx.throw(400, 'login.error', { originalError: err })
    }
  }
}
