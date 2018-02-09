import { Env } from '../Env';

describe('Env service', () => {
  let env: Env;

  beforeEach(() => {
    env = new Env();
  });

  it('isTest should respond true if NODE_ENV === test', () => {
    expect(env.isTest()).toBeTruthy();
  });

  it('isLocal should respond true if NODE_ENV === local', () => {
    env.NODE_ENV = 'local';
    expect(env.isLocal()).toBeTruthy();
  });

  it('isStaging should respond true if NODE_ENV === staging', () => {
    env.NODE_ENV = 'staging';
    expect(env.isStaging()).toBeTruthy();
  });

  it('isProduction should respond true if NODE_ENV === production', () => {
    env.NODE_ENV = 'production';
    expect(env.isProduction()).toBeTruthy();
  });
});
