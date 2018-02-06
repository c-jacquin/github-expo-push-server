import * as axios from 'axios';

export class Http {
  public get(uri: string, config?: axios.AxiosRequestConfig) {
    return Promise.resolve({ data: {} });
  }

  public post(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return Promise.resolve({ data: {} });
  }

  public put(uri: string, body: any, config?: axios.AxiosRequestConfig) {
    return Promise.resolve({ data: {} });
  }
}
