import {
  asClass,
  asValue,
  createContainer,
  InjectionMode,
  Lifetime,
} from 'awilix';

import { Env } from './services/Env';
import { Github } from './services/Github';
import { Http } from './services/Http';
import { I18n } from './services/I18n';
import { Logger } from './services/Logger';
import { IMeta, meta } from './services/Meta';
import { PushNotification } from './services/PushNotification';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

export const asSingleton = <T>(Service) => {
  return asClass<T>(Service, {
    lifetime: Lifetime.SINGLETON,
  });
};

container.register({
  env: asSingleton<Env>(Env),
  github: asSingleton<Github>(Github),
  http: asSingleton<Http>(Http),
  i18n: asSingleton<I18n>(I18n),
  logger: asSingleton<Logger>(Logger),
  meta: asValue<IMeta>(meta),
  pushNotification: asSingleton<PushNotification>(PushNotification),
});
