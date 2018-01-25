const UNKNOWN_ERROR_CODE = 500

export const errorResponder = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const logger = ctx.state.container.resolve('logger')

    ctx.status = err.status || UNKNOWN_ERROR_CODE
    ctx.body = err.message || ''

    logger.error(`${ctx.status} response: ${ctx.body}`, {
      requestId: ctx.requestId,
    })
    if (ctx.status === UNKNOWN_ERROR_CODE) {
      logger.error(`${err.stack}`, { requestId: ctx.requestId })
    }
  }
}
