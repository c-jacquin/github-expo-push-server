import { before, route, POST, PUT } from 'awilix-koa'
import { MongoEntityManager, MongoRepository } from 'typeorm'
import * as Expo from 'expo-server-sdk'
import * as check from 'check-types'
import { validateParams } from '../_helpers_/validate-params'
import { exposeUser } from '../_helpers_/expose-user'
import { PushNotification } from '../../services/PushNotification'
import { I18n } from '../../services/I18n'
import { User } from '../../entity/User'

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
    private dbManager: MongoEntityManager,
    private userRepository: MongoRepository<User>,
    private i18n: I18n,
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
    try {
      await this.pushNotification.dispatchNotifications(ctx.request.body)

      ctx.body = {}
    } catch (err) {
      ctx.throw(400, 'push.error', { originalError: err })
    }
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
      const user = new User()
      user.login = login
      user.pushToken = ctx.request.body.pushToken

      await this.dbManager.save(user)

      ctx.body = {
        message: this.i18n.translate('push.register.success'),
      }
    } catch (err) {
      // if duplicate error send a 200 status
      /* istanbul ignore next */
      if (err.code === 11000) {
        ctx.body = {
          message: this.i18n.translate('push.register.error.exist'),
        }
      } else {
        ctx.throw(400, 'push.register.error.default', { originalError: err })
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
    try {
      const { login } = ctx.state.container.resolve('user')

      await this.userRepository.findOneAndUpdate({ login }, ctx.request.body)

      ctx.body = {
        message: this.i18n.translate('profile.update.success'),
      }
    } catch (err) {
      ctx.throw(400, 'profile.update.error', { originalError: err })
    }
  }
}
