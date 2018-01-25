import { asClass, asValue, createContainer, Lifetime } from 'awilix'

import { Env } from './Env'
import { Github } from './Github'
import { Http } from './Http'
import { Logger } from './Logger'
import { PushNotification } from './PushNotification'

const container = createContainer()

const singleton = Service => {
  return asClass(Service, { lifetime: Lifetime.SINGLETON })
}

container.register({
  env: singleton(Env),
  expo: singleton(require('expo-server-sdk')),
  github: singleton(Github),
  http: singleton(Http),
  logger: singleton(Logger),
  pushNotification: singleton(PushNotification),
})

export { container, Env, Github, Logger, PushNotification }
