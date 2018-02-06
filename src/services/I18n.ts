import * as Polyglot from 'node-polyglot'

import { Env } from './Env'
import * as enMessages from '../translations/en.json'
import * as frMessages from '../translations/fr.json'

export class I18n extends Polyglot {
  static messages = {
    en: enMessages,
    fr: frMessages,
  }

  constructor(env: Env) {
    super({
      locale: env.DEFAULT_LOCALE,
      phrases: I18n.messages[env.DEFAULT_LOCALE],
    })
  }

  setLocale(locale: string): void {
    this.locale(locale)

    this.extend(I18n.messages[locale])
  }

  translate(phrase: string, variables?: any): string {
    return this.t(phrase, variables)
  }
}
