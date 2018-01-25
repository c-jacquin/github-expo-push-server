import { Logger as WinstonLogger, transports } from 'winston'

const formatter = options =>
  options.meta && options.meta.requestId
    ? `[RQID=${options.meta.requestId}] ${options.message}`
    : `${options.message}`

export class Logger extends WinstonLogger {
  constructor({ env }) {
    super({
      transports: [
        new transports.Console({
          level: env.LOG_LEVEL,
          formatter,
        }),
      ],
    })
  }
}
