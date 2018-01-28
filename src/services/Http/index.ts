import * as axios from 'axios'

export class Http {
  fetch = axios.default

  constructor({ logger }) {
    this.fetch.interceptors.request.use(
      config => {
        logger.info(`Http => ${config.method} ${config.url}`)
        return config
      },
      error => Promise.reject(error),
    )

    this.fetch.interceptors.response.use(
      response => {
        logger.info(
          `Http success => ${response.config.method} ${response.config.url}`,
        )
        return response
      },
      error => Promise.reject(error),
    )
  }

  get(uri: string, config?: axios.AxiosRequestConfig) {
    return this.fetch.get(uri, config)
  }

  post(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return this.fetch.post(uri, body, config)
  }

  put(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return this.fetch.put(uri, body, config)
  }
}
