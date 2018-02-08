import 'reflect-metadata';

import { asValue, Resolver } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import * as fs from 'fs';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as morgan from 'koa-morgan';
import * as path from 'path';
import {
  getMongoManager,
  getMongoRepository,
  MongoEntityManager,
  MongoRepository,
  ObjectID,
} from 'typeorm';

export const app = new Koa();

import { container } from './container';
import { connectDatabase } from './database';
import { User } from './entity/User';
import { errorResponder } from './middlewares/error-responder';
import { generateRequestId } from './middlewares/request-id-generator';
import { setupI18n } from './middlewares/setup-i18n';
import { Env } from './services/Env';
import { I18n } from './services/I18n';
import { Logger } from './services/Logger';

(async () => {
  const logger = container.resolve<Logger>('logger');
  const env = container.resolve<Env>('env');
  const i18n = container.resolve<I18n>('i18n');

  /* istanbul ignore next */
  if (env.REQUEST_LOGS) {
    const format =
      '[RQID=:request-id] - :remote-user' +
      ' [:date[clf]] ":method :url HTTP/:http-version" ' +
      ':status :res[content-length] ":referrer" ":user-agent"';

    morgan.token('request-id', (req: any) => req.requestId);

    if (env.isProduction()) {
      const stream = fs.createWriteStream(
        path.join(process.cwd(), '/log/httpIn.log'),
        {
          flags: 'a',
        },
      );

      app.use(morgan(format, { stream }));
    } else {
      app.use(morgan(format));
    }
  }

  /* istanbul ignore if */
  if (require.main === module) {
    try {
      await connectDatabase();
    } catch (error) {
      logger.error(i18n.translate('database.error.connection', { error }));
      process.exit(1);
    }
  }

  app
    .use(helmet())
    .use(bodyParser())
    .use(scopePerRequest(container))
    .use(generateRequestId)
    .use(setupI18n)
    .use(errorResponder)
    .use(loadControllers(env.API_GLOB, { cwd: __dirname }));

  /* istanbul ignore if */
  if (require.main === module) {
    app.listen(env.PORT);
    logger.info(i18n.translate('server.listen', { port: env.PORT }));
  }
})();
