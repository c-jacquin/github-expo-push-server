const { shallowCtrl, deepCtrl } = require('./health-check.controller');

/**
 * Health check routes: used by load balancers to determine if traffic should
 * be routed to nodes.
 */
const healthCheckRouter = router => {
  router.get('/health/shallow', shallowCtrl).get('/health/deep', deepCtrl);
};

module.exports = { healthCheckRouter };
