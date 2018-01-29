import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as helmet from 'koa-helmet'
import * as morgan from 'koa-morgan'
import { MongoEntityManager } from 'typeorm'
import { asValue } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'

export const app = new Koa()

import { container } from './container'
import { Logger } from './services/Logger'
import { Env } from './services/Env'
import { connectDatabase } from './database'
import { errorResponder } from './middleware/error-responder'
import { generateRequestId } from './middleware/request-id-generator'

/* tslint:disable */
(async () => {

/* tslint:enable */
  const logger = container.resolve<Logger>('logger')
  const env = container.resolve<Env>('env')

  /* istanbul ignore next */
  if (env.REQUEST_LOGS) {
    const format =
      '[RQID=:request-id] - :remote-user' +
      ' [:date[clf]] ":method :url HTTP/:http-version" ' +
      ':status :res[content-length] ":referrer" ":user-agent"'
    morgan.token('request-id', (req: any) => req.requestId)
    app.use(morgan(format))
  }

  try {
    const { mongoManager } = await connectDatabase(env)

    container.register<MongoEntityManager>('dbClient', asValue(mongoManager))
  } catch (err) {
    /* istanbul ignore next */
    logger.error('database connection error: ', err)
    /* istanbul ignore next */
    process.exit(1)
  }

  app
    .use(helmet())
    .use(bodyParser())
    .use(scopePerRequest(container))
    .use(generateRequestId)
    .use(errorResponder)
    .use(loadControllers('./api/**/index.ts', { cwd: __dirname }))

  /* istanbul ignore if */
  if (require.main === module) {
    app.listen(env.PORT)
    logger.info(`Starting server on port ${env.PORT}`)
  }
})()
