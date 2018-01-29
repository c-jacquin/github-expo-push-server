const UNKNOWN_ERROR_CODE = 500

export const errorResponder = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const logger = ctx.state.container.resolve('logger')
    const { requestId } = ctx.state.container.resolve('meta')

    /* istanbul ignore next */
    ctx.status = err.status || UNKNOWN_ERROR_CODE
    /* istanbul ignore next */
    ctx.body = err.message || ''

    logger.error(`${ctx.status} response: ${ctx.body}`, {
      requestId,
    })
    /* istanbul ignore if */
    if (ctx.status === UNKNOWN_ERROR_CODE) {
      logger.error(`${err.stack}`, { requestId })
    }
  }
}
