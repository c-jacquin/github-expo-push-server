export class Env {
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
    return require('yenv')();
  }
}
