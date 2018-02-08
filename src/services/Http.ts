import * as axios from 'axios';
import * as clfDate from 'clf-date';
import { Logger, transports } from 'winston';

import { Env } from './Env';
import { IMeta } from './Meta';

export class Http {
  public static LOG_FILE = 'log/httpOut.log';

  constructor(meta: IMeta, env: Env) {
    const logger = new Logger({
      transports: [
        env.isProduction()
          ? new transports.File({
              filename: Http.LOG_FILE,
              level: env.LOG_LEVEL,
            })
          : new transports.Console({
              colorize: true,
              level: env.LOG_LEVEL,
            }),
      ],
    });
    axios.default.interceptors.response.use(
      response => {
        logger.info(
          `[${meta.requestId}] - - [${clfDate()}] ` +
            `Http => ${response.config.method.toUpperCase()} ` +
            `${response.config.url} HTTP/1.1 ${response.status} - ` +
            `${response.config.headers['User-Agent']}`,
        );
        return response;
      },
      error => {
        logger.info(
          `[${meta.requestId}] - - [${clfDate()}] ` +
            `Http => ${error.config.method.toUpperCase()} ` +
            `${error.config.url} HTTP/1.1 ${error.response.status}` +
            `- ${error.message}` +
            `${error.config.headers['User-Agent']}`,
        );
        return Promise.reject(error);
      },
    );
  }

  public get(uri: string, config?: axios.AxiosRequestConfig) {
    return axios.default.get(uri, config);
  }

  public post(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return axios.default.post(uri, body, config);
  }

  public put(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return axios.default.put(uri, body, config);
  }
}
