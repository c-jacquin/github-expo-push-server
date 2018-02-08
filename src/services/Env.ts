import * as yenv from 'yenv';

export class Env {
  public APP_ENV: {
    LOCAL: 'string';
    PRODUCTION: 'string';
    STAGING: 'string';
  };
  public API_GLOB: string;
  public DEFAULT_LOCALE: string;
  public GITHUB_API: string;
  public GITHUB_TOKEN_URI: string;
  public GITHUB_SECRET: string;
  public LOG_LEVEL: string;
  public NODE_ENV: string;
  public PORT: number;
  public REQUEST_LOGS: boolean;
  public TYPEORM_CONNECTION: 'mongodb';
  public TYPEORM_URL: string;
  public TYPEORM_SYNCHRONIZE: boolean;
  public TYPEORM_LOGGING: boolean;
  public TYPEORM_ENTITIES: string[];

  constructor() {
    return Object.assign(this, yenv());
  }

  public isLocal() {
    return this.NODE_ENV === this.APP_ENV.LOCAL;
  }

  public isProduction() {
    return this.NODE_ENV === this.APP_ENV.PRODUCTION;
  }

  public isStaging() {
    return this.NODE_ENV === this.APP_ENV.STAGING;
  }
}
