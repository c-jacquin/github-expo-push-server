import { before, route, POST, PUT } from 'awilix-koa'
import { MongoEntityManager } from 'typeorm'
import * as Expo from 'expo-server-sdk'
import * as check from 'check-types'
import { validateParams } from '../_helpers_/validate-params'
import { exposeUser } from '../_helpers_/expose-user'
import { PushNotification } from '../../services/PushNotification'

@route('/push')
export default class PushApi {
  static validatePushProfile = settings => {
    return (
      check.boolean(settings.pushEnabled) &&
      check.boolean(settings.pushIssue) &&
      check.boolean(settings.pushCommit) &&
      check.boolean(settings.pushPr)
    )
  }

  static validateGithubSender = sender => !!sender.login

  constructor(
    private pushNotification: PushNotification,
    private dbClient: MongoEntityManager,
  ) {}

  @POST()
  @before([
    validateParams(['request', 'body'], ['action'], check.string),
    validateParams(
      ['request', 'body'],
      ['sender'],
      PushApi.validateGithubSender,
    ),
  ])
  async push(ctx) {
    await this.pushNotification.dispatchNotifications(ctx.request.body)

    ctx.body = {}
  }

  @route('/register')
  @POST()
  @before([
    validateParams(['request', 'headers'], ['authorization'], check.string),
    validateParams(['request', 'body'], ['pushToken'], Expo.isExpoPushToken),
    exposeUser,
  ])
  async register(ctx) {
    try {
      const { login } = ctx.state.container.resolve('user')

      await this.dbClient.save('User', {
        ...ctx.request.body,
        login,
      })

      ctx.body = {
        message: 'push notification registered',
      }
    } catch (err) {
      // if duplicate error send a 200 status
      /* istanbul ignore next */
      if (err.code === 11000) {
        ctx.body = {
          message: 'push notification already registered.',
        }
      } else {
        /* istanbul ignore next */
        ctx.throw(err)
      }
    }
  }

  @route('/profile')
  @PUT()
  @before([
    validateParams(['request', 'headers'], ['authorization'], check.string),
    validateParams(
      ['request', 'body'],
      ['profile'],
      PushApi.validatePushProfile,
    ),
    exposeUser,
  ])
  async pushProfile(ctx) {
    const { login } = ctx.state.container.resolve('user')

    await this.dbClient.findOneAndUpdate('User', { login }, ctx.request.body)

    ctx.body = {
      message: 'profile updated.',
    }
  }
}
