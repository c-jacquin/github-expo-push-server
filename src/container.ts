import {
  asClass,
  asValue,
  createContainer,
  Lifetime,
  InjectionMode,
} from 'awilix'

import { Env } from './services/Env'
import { Github } from './services/Github'
import { Http } from './services/Http'
import { Logger } from './services/Logger'
import { PushNotification } from './services/PushNotification'

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
})

export const asSingleton = <T>(Service) => {
  return asClass<T>(Service, {
    lifetime: Lifetime.SINGLETON,
  })
}

interface Meta {
  requestId: string
}

const meta = {
  requestId: '',
}

container.register({
  env: asSingleton<Env>(Env),
  github: asSingleton<Github>(Github),
  http: asSingleton<Http>(Http),
  logger: asSingleton<Logger>(Logger),
  meta: asValue<Meta>(meta),
  pushNotification: asSingleton<PushNotification>(PushNotification),
})
