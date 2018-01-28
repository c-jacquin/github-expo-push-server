import { asClass, asValue, createContainer, Lifetime } from 'awilix'

import { Env } from './Env'
import { Github } from './Github'
import { Http } from './Http'
import { Logger } from './Logger'
import { PushNotification } from './PushNotification'

const container = createContainer()

const singleton = <T>(Service) => {
  return asClass<T>(Service, { lifetime: Lifetime.SINGLETON })
}

container.register({
  env: singleton<Env>(Env),
  expo: singleton<any>(require('expo-server-sdk')),
  github: singleton<Github>(Github),
  http: singleton<Http>(Http),
  logger: singleton<Logger>(Logger),
  pushNotification: singleton<PushNotification>(PushNotification),
})

export { container, Env, Github, Logger, PushNotification }
