const {
  getArbitraryData,
} = require('../../services/arbitrary-data.service.js');
const { logger } = require('../../services/logger');

/**
 * Shallow health check: used by load balancers to see if this node is running
 * properly. Typically a load balancer will stop directing traffic to unhealthy
 * nodes automatically.
 */
async function shallow(ctx) {
  ctx.body = { healthy: true };
}

/**
 * Deep health check: if this server depends on other services, the deep health
 * check will test that we can connect to them properly as well.
 *
 * This example hits a remote API that provides randomized data; if the request
 * succeeds we'll return the success document; if it fails we'll report that
 * too.
 */
async function deep(ctx) {
  try {
    // Use the request ID generated by the 'request-id-generator' middleware
    // to tie any outgoing HTTP requests to this incoming request. This is
    // important for making sense of server logs, given the way the event
    // loop works in NodeJS.
    const data = await getArbitraryData({
      requestId: ctx.requestId,
      path: 'posts',
    });

    logger.debug('Deep health check got:', data, { requestId: ctx.requestId });
    ctx.body = {
      healthy: true,
      services: {
        arbitraryDataService: { healthy: true },
      },
    };
  } catch (error) {
    ctx.body = {
      healthy: false,
      services: {
        arbitraryDataService: { healthy: false },
      },
    };
  }
}

module.exports = { shallow, deep };
