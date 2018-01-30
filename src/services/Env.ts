export class Env {
  DEFAULT_LOCALE: string
  GITHUB_API: string
  GITHUB_TOKEN_URI: string
  GITHUB_SECRET: string
  LOG_LEVEL: string
  NODE_ENV: string
  PORT: number
  REQUEST_LOGS: boolean
  TYPEORM_CONNECTION: 'mongodb'
  TYPEORM_URL: string
  TYPEORM_SYNCHRONIZE: boolean
  TYPEORM_LOGGING: boolean
  TYPEORM_ENTITIES: string[]

  constructor() {
    return require('yenv')()
  }
}
