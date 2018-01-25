import { before, route, POST, PUT } from 'awilix-koa'
import { MongoEntityManager } from 'typeorm'
import * as Expo from 'expo-server-sdk'
import * as check from 'check-types'
import { validateParams } from '../../middleware'
import { PushNotification } from '../../services'

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

  pushNotification: PushNotification
  dbClient: MongoEntityManager

  constructor({ pushNotification, dbClient }) {
    this.pushNotification = pushNotification
    this.dbClient = dbClient
  }

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
      ctx.throw(err)
    }
  }

  @route('/register')
  @POST()
  @before([
    validateParams(['request', 'body'], ['login'], check.string),
    validateParams(['request', 'body'], ['pushToken'], Expo.isExpoPushToken),
  ])
  async register(ctx) {
    try {
      const user = await this.dbClient.save('User', ctx.request.body)

      ctx.body = {
        message: 'push notification registered',
      }
    } catch (err) {
      // if duplicate error send a 200 status
      if (err.code === 11000) {
        ctx.body = {
          message: 'push notification already registered.',
        }
      } else {
        ctx.throw(err)
      }
    }
  }

  @route('/profile')
  @PUT()
  @before([
    validateParams(['request', 'body'], ['login'], check.string),
    validateParams(
      ['request', 'body'],
      ['profile'],
      PushApi.validatePushProfile,
    ),
  ])
  async pushProfile(ctx) {
    try {
      const { login } = ctx.request.body

      await this.dbClient.findOneAndUpdate('User', { login }, ctx.request.body)

      ctx.body = {
        message: 'profile updated.',
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
}
