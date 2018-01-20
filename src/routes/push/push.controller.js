const { User } = require('../../models/User');
const { dispatchNotifications } = require('../../services/push-notifications');

const pushCtrl = async ctx => {
  try {
    // console.log('notif', ctx.request.body);
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
        message: 'push notification already registered',
      };
    } else {
      ctx.throw(err);
    }
  }
};

module.exports = {
  pushCtrl,
  registerCtrl,
};
