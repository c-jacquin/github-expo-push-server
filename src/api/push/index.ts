import { before, POST, PUT, route } from 'awilix-koa';
import * as check from 'check-types';
import * as Expo from 'expo-server-sdk';
import { MongoEntityManager, MongoRepository } from 'typeorm';
import { User } from '../../entity/User';
import { exposeUser } from '../../middlewares/expose-user';
import { validateParams } from '../../middlewares/validate-params';
import { I18n } from '../../services/I18n';
import { PushNotification } from '../../services/PushNotification';

@route('/push')
export default class PushApi {
  public static validatePushProfile = settings => {
    return (
      check.boolean(settings.pushEnabled) &&
      check.boolean(settings.pushIssue) &&
      check.boolean(settings.pushCommit) &&
      check.boolean(settings.pushPr)
    );
  };

  public static validateGithubSender = sender => !!sender.login;

  constructor(
    private pushNotification: PushNotification,
    private dbManager: MongoEntityManager,
    private userRepository: MongoRepository<User>,
    private i18n: I18n,
  ) {}

  @POST()
  @before([
    validateParams(
      ['request', 'body'],
      ['sender'],
      PushApi.validateGithubSender,
    ),
  ])
  public async push(ctx) {
    try {
      await this.pushNotification.dispatchNotifications(ctx.request.body);

      ctx.body = {};
    } catch (err) {
      ctx.throw(400, 'push.error', { originalError: err });
    }
  }

  @route('/register')
  @POST()
  @before([
    validateParams(['request', 'headers'], ['authorization'], check.string),
    validateParams(['request', 'body'], ['pushToken'], Expo.isExpoPushToken),
    exposeUser,
  ])
  public async register(ctx) {
    try {
      const { login } = ctx.state.container.resolve('user');

      const user = new User();
      user.login = login;
      user.pushToken = ctx.request.body.pushToken;

      const result = await Promise.all([
        this.dbManager.save(user),
        this.userRepository.findOne({
          login,
          select: ['pushCommit', 'pushEnabled', 'pushIssue', 'pushPr'],
        }),
      ]);

      ctx.body = {
        message: this.i18n.translate('push.register.success'),
        pushSettings: result[1],
      };
    } catch (err) {
      // if duplicate error send a 200 status
      /* istanbul ignore next */
      if (err.code === 11000) {
        ctx.body = {
          message: this.i18n.translate('push.register.error.exist'),
        };
      } else {
        ctx.throw(400, 'push.register.error.default', { originalError: err });
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
  public async pushProfile(ctx) {
    try {
      const { login } = ctx.state.container.resolve('user');
      const { profile } = ctx.request.body;

      const user = await this.userRepository.findOne({ login });

      user.pushCommit = profile.pushCommit;
      user.pushEnabled = profile.pushEnabled;
      user.pushIssue = profile.pushIssue;
      user.pushPr = profile.pushPr;

      await this.userRepository.save(user);

      ctx.body = {
        message: this.i18n.translate('profile.update.success'),
        profile,
      };
    } catch (err) {
      ctx.throw(400, 'profile.update.error', { originalError: err });
    }
  }
}
