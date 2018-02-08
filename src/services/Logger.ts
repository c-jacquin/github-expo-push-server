import { Logger as WinstonLogger, transports } from 'winston';

import { Env } from './Env';

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${options.message}`
    : `${options.message}`;

export class Logger extends WinstonLogger {
  public static LOG_FILE = 'log/app.log';

  constructor(env: Env) {
    super({
      transports: [
        env.isProduction()
          ? new transports.File({
              filename: Logger.LOG_FILE,
              formatter,
              level: env.LOG_LEVEL,
            })
          : new transports.Console({
              colorize: true,
              formatter,
              level: env.LOG_LEVEL,
            }),
      ],
    });
  }
}
