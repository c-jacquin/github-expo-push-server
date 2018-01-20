const Expo = require('expo-server-sdk');
const { pushCtrl, registerCtrl } = require('./push.controller');
const { validateParams } = require('../../middleware/validate-params');
const { isString, validateGithubSender } = require('../../helpers/validators');

/**
 * Receive push notification from github and send it to expo server
 */
const pushRouter = router => {
  router.post(
    '/push',
    validateParams(['request', 'body'], ['action'], isString),
    validateParams(['request', 'body'], ['sender'], validateGithubSender),
    pushCtrl
  );

  router.post(
    '/push/register',
    validateParams(['request', 'body'], ['login'], isString),
    validateParams(['request', 'body'], ['pushToken'], Expo.isExpoPushToken),
    registerCtrl
  );
};

module.exports = { pushRouter };
