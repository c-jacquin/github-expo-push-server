import 'jest'

import * as Polyglot from 'node-polyglot'

import { I18n } from '../I18n'
import { Env } from '../Env'

describe('I18n service', () => {
  const env = new Env()
  let i18n: I18n

  beforeEach(() => {
    i18n = new I18n(env)
  })

  it('setLocale => should set the locale property', async () => {
    const spy = jest.spyOn(Polyglot.prototype, 'locale')
    i18n.setLocale('fr')

    expect(i18n.locale()).toBe('fr')
    expect(spy).toHaveBeenCalled()
  })

  it('translate => should call the t method of polyglot', async () => {
    const spy = jest.spyOn(Polyglot.prototype, 't')

    i18n.extend({ foo: 'bar' })
    const message = i18n.translate('foo')
    expect(spy).toHaveBeenCalled()
    expect(message).toBe('bar')
  })
})
