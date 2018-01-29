import * as axios from 'axios'
import * as clfDate from 'clf-date'

import { Logger } from './Logger'

export class Http {
  constructor(logger: Logger, meta: any) {
    axios.default.interceptors.response.use(
      response => {
        logger.info(
          `[${meta.requestId}] - - [${clfDate()}] ` +
            `Http => ${response.config.method.toUpperCase()} ` +
            `${response.config.url} HTTP/1.1 ${response.status} - ` +
            `${response.config.headers['User-Agent']}`,
        )
        return response
      },
      error => {
        logger.info(
          `[${meta.requestId}] - - [${clfDate()}] ` +
            `Http => ${error.config.method.toUpperCase()} ` +
            `${error.config.url} HTTP/1.1 ${error.response.status}` +
            `- ${error.message}` +
            `${error.config.headers['User-Agent']}`,
        )
        return Promise.reject(error)
      },
    )
  }

  get(uri: string, config?: axios.AxiosRequestConfig) {
    return axios.default.get(uri, config)
  }

  post(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return axios.default.post(uri, body, config)
  }

  put(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return axios.default.put(uri, body, config)
  }
}
