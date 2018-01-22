const { User } = require('../../models/User');
const { dispatchNotifications } = require('../../services/push-notifications');

const pushCtrl = async ctx => {
  try {
    await dispatchNotifications(ctx.request.body);

    ctx.body = {};
  } catch (err) {
    ctx.throw(err);
  }
};

const registerCtrl = async ctx => {
  try {
    const user = new User(ctx.request.body);

    await user.save();

    ctx.body = {
      message: 'push notification registered',
    };
  } catch (err) {
    // if duplicate error send a 200 status
    if (err.code === 11000) {
      ctx.body = {
        message: 'push notification already registered.',
      };
    } else {
      ctx.throw(err);
    }
  }
};

const updateProfileCtrl = async ctx => {
  try {
    const { login } = ctx.request.body;

    await User.update({ login }, ctx.request.body);

    ctx.body = {
      message: 'profile updated.',
    };
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  pushCtrl,
  registerCtrl,
  updateProfileCtrl,
};
