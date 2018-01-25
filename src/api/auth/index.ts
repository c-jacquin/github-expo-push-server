import { before, route, POST } from 'awilix-koa'
import * as check from 'check-types'

import { validateParams } from '../../middleware'
import { Github } from '../../services'

@route('/auth')
export default class AuthApi {
  github: Github

  constructor({ github }) {
    this.github = github
  }

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
      ctx.throw(err)
    }
  }
}
