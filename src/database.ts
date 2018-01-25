import { createConnection } from 'typeorm'
import { Env } from './services'

export const connectDatabase = (env: Env) => {
  return createConnection({
    type: env.TYPEORM_CONNECTION,
    url: env.TYPEORM_URL,
    synchronize: env.TYPEORM_SYNCHRONIZE,
    logging: env.TYPEORM_LOGGING,
    entities: env.TYPEORM_ENTITIES,
  })
}
