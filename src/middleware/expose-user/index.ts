import * as checkTypes from 'check-types'
import { GithubUser } from '../../services/Github/GithubUser'
import { asValue } from 'awilix'

/**
 * check if a github token is present in the authorization header and fetch
 * the corresponding login on github api.
 */
export const exposeUser = async (ctx, next) => {
  const container = ctx.state.container.github

  const user = await container.github.getLogin(
    ctx.request.headers.authorization,
  )

  if (!(user instanceof GithubUser)) {
    ctx.throw(400, 'something is wrong with the github api')
  }

  container.register('user', asValue(user))

  await next()
}
