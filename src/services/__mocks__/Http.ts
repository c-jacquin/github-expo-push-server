import * as axios from 'axios'

export class Http {
  get(uri: string, config?: axios.AxiosRequestConfig) {
    return Promise.resolve({ data: {} })
  }

  post(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return Promise.resolve({ data: {} })
  }

  put(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return Promise.resolve({ data: {} })
  }
}
