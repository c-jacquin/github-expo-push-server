export const setupI18n = async (ctx, next) => {
  if (ctx.request.headers['Content-Language']) {
    const i18n = ctx.state.container.resolve('i18n')

    i18n.setLocale(ctx.request.headers['Content-Language'])
  }
  await next()
}
