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

  post(uri: string, body: any) {
    return this.fetch.post(uri, body)
  }

  put(uri: string, body: any) {
    return this.fetch.put(uri, body)
  }
}
