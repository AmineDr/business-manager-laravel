import { Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './tokens';

export class AxiosInstance extends Axios {
  token = getToken();

  constructor() {
    super({
      baseURL: 'http://localhost:8000/api',
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    });
    
    this.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (this.token) {
        // config.withCredentials = true
        config.headers.Authorization = `Bearer ${this.token}`
      }
      if (config.method === "post") {
        const formData = new FormData()
        Object.entries(config.data).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        config.data = formData
      }
      return config
    })

    this.interceptors.response.use((resp: AxiosResponse<any, any>) => {
      if (typeof resp.data === 'string') {
        resp.data = JSON.parse(resp.data);
      }
      return resp;
    });
  }
}
