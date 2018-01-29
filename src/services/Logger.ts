import { Logger as WinstonLogger, transports } from 'winston'

import { Env } from './Env'

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${options.message}`
    : `${options.message}`

const { Console, File } = transports

export class Logger extends WinstonLogger {
  static COMBINED_FILE = 'log/combined.log'

  constructor(env: Env) {
    super({
      transports: [
        new Console({
          colorize: true,
          level: env.LOG_LEVEL,
          formatter,
        }),
      ],
    })
    /* istanbul ignore if */
    if (env.NODE_ENV === 'production') {
      this.add(
        new File({
          filename: Logger.COMBINED_FILE,
          level: env.LOG_LEVEL,
          formatter,
        }),
      )
    }
  }
}
