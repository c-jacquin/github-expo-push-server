import * as checkTypes from 'check-types'
import { asValue } from 'awilix'

/**
 * check if a github token is present in the authorization header and fetch
 * the corresponding login on github api.
 */
export const exposeUser = async (ctx, next) => {
  const container = ctx.state.container

  const github = container.resolve('github')

  const user = await github.getUser(ctx.request.headers.authorization)

  /* istanbul ignore if */
  if (!user) {
    ctx.throw(400, 'something is wrong with the github api')
  } else {
    container.register('user', asValue(user))
  }

  await next()
}
