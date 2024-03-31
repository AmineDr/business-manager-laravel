import { Axios, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './tokens';
import { isDevMode } from '@angular/core';

const baseURL = !isDevMode() ? '/api' : 'http://localhost:8000/api';

export class AxiosInstance extends Axios {
  token = getToken();

  constructor() {
    super({
      baseURL: baseURL,
    });

    this.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (this.token) {
        // config.withCredentials = true
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      if (config.method === 'post') {
        const formData = new FormData();
        Object.entries(config.data).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        config.data = formData;
      } else if (config.method === "patch") {
        config.data = new URLSearchParams(config.data)
      }
      return config;
    });

    this.interceptors.response.use((resp: AxiosResponse<any, any>) => {
      if (typeof resp.data === 'string') {
        try {
          resp.data = JSON.parse(resp.data);
        } catch (err){

        }
      }
      return resp;
    });
  }
}
