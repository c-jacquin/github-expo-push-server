const { authCtrl } = require('./auth.controller');
const { validateParams } = require('../../middleware/validate-params');
const { isString } = require('../../helpers/validators');

/**
 * A simple module to authenticate with github
 */
const authRouter = router => {
  router.post(
    '/auth',
    validateParams(['request', 'body'], ['code'], isString),
    authCtrl
  );
};

module.exports = { authRouter };
