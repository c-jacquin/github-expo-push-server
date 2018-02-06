import { Logger as WinstonLogger, transports } from 'winston';

import { Env } from './Env';

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${options.message}`
    : `${options.message}`;

export class Logger extends WinstonLogger {
  public static COMBINED_FILE = 'log/combined.log';

  constructor(env: Env) {
    super({
      transports: [
        new transports.Console({
          colorize: true,
          formatter,
          level: env.LOG_LEVEL,
        }),
        new transports.File({
          filename: Logger.COMBINED_FILE,
          formatter,
          level: env.LOG_LEVEL,
        }),
      ],
    });
  }
}
