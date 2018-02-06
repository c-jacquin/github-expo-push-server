import { container } from '../../container';
import { setupI18n } from '../setup-i18n';

describe('setup-i18n middleware', () => {
  let i18n;

  beforeEach(() => {
    i18n = container.resolve('i18n');
  });

  it('should store the locale set in the Content-Language', async () => {
    const ctx = {
      request: {
        headers: {
          'Content-Language': 'fr',
        },
      },
      state: {
        container,
      },
    };
    const next = () => Promise.resolve({});

    setupI18n(ctx, next);
    expect(i18n.locale()).toBe('fr');
  });
});
