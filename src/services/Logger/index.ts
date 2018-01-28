import { Logger as WinstonLogger, transports } from 'winston'

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${options.message}`
    : `${options.message}`

const { Console, File } = transports

export class Logger extends WinstonLogger {
  static COMBINED_FILE = 'log/combined.log'

  constructor({ env }) {
    if (env.NODE_ENV === 'production') {
      super({
        transports: [
          new File({
            filename: Logger.COMBINED_FILE,
            level: env.LOG_LEVEL,
            formatter,
          }),
        ],
      })
    } else {
      super({
        transports: [
          new Console({
            colorize: true,
            level: env.LOG_LEVEL,
            formatter,
          }),
        ],
      })
    }
  }
}
