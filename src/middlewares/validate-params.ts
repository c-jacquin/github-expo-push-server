import * as R from 'ramda';

/**
 * Middleware that checks for required parameters.
 *
 * @param {string[]} containerPath - Where the parameters live in the ctx
 * instance (session,[request, body], etc.).
 * @param {string[]} params - the names of the params to check.
 * @param {function} [validator] (optional) - a function to validate the
 * parameters in question. If this is omitted, a simple presence check will
 * be performed.
 */
export const validateParams = (
  containerPath: string[],
  params: string[],
  validator: (param: any) => boolean,
) => async (ctx, next) => {
  const container = R.path(containerPath, ctx);
  /* istanbul ignore if */
  if (!container) {
    const logger = ctx.state.container.resolve('Logger');

    logger.warn('Invalid param container:', container, {
      requestId: ctx.requestId,
    });
    ctx.throw(400, 'Bad request');
  }

  R.forEach(assertValid(ctx, container, validator), params);
  await next();
};

const assertValid = (ctx, container, validator) => param => {
  if (!container[param]) {
    ctx.throw(400, `${container.toString()} ${param} is required.`);
  }

  if (validator && !validator(container[param])) {
    ctx.throw(400, `${container.toString()} ${param} is invalid.`);
  }
};
