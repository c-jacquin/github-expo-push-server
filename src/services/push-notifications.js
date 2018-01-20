const Expo = require('expo-server-sdk');

const { logger } = require('./logger');
const { User } = require('../models/User');

const expo = new Expo();

const dispatchNotifications = async notification => {
  try {
    const users = await User.find();
    const messages = [];

    for (const { login, pushToken } of users) {
      if (!Expo.isExpoPushToken(pushToken)) {
        throw new Error(`token ${pushToken} is not a valid Expo push token`);
      }

      if (login === notification.sender.login) {
        messages.push({
          to: pushToken,
          sound: 'default',
          body: 'This is a test notification',
          data: { yeah: 'yeah' },
        });
      }
    }

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      const receipts = await expo.sendPushNotificationsAsync(chunk);
      logger.info(
        `Push Notification => ${notification.sender.login}`,
        receipts
      );
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  dispatchNotifications,
};
