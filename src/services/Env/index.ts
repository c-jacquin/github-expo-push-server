export class Env {
  PORT: number
  REQUEST_LOGS: boolean
  LOG_LEVEL: string
  GITHUB_API: string
  GITHUB_TOKEN_URI: string
  GITHUB_SECRET: string
  TYPEORM_CONNECTION: 'mongodb'
  TYPEORM_URL: string
  TYPEORM_SYNCHRONIZE: boolean
  TYPEORM_LOGGING: boolean
  TYPEORM_ENTITIES: string[]

  constructor() {
    return require('yenv')()
  }
}
