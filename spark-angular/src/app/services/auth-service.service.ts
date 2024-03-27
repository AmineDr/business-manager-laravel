import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AxiosInstance } from '../common/axiosInstance';
import { Router } from '@angular/router';
import { clearToken } from '../common/tokens';

const auth_routes = [
  'login', 'register'
]

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource = new BehaviorSubject<UserInfo | null>(null);
  private axios = new AxiosInstance();
  private router = new Router()
  user = this.userSource.asObservable();

  constructor() {}

  getUserInfo() {
    return this.userSource.getValue();
  }

  setUserInfo(user: UserInfo | null) {
    this.userSource.next(user);
  }

  async checkSession() {
    const localStorageToken = localStorage.getItem('api_token');
    
    if (this.getUserInfo() && localStorageToken) {
      return Promise.resolve(true);
    }

    if (!localStorageToken) {
      return Promise.resolve(false);
    }
    
    return new Promise((resolve, reject) => {
      this.axios.get('/user/self')
        .then(resp => {
          if (resp.data.status === 'success') {
            this.setUserInfo(resp.data.userInfo as UserInfo);
            const url = this.router.url.replace('/', '')
            for (let x=0; x<auth_routes.length; x++) {
              if (url.startsWith(auth_routes[x])) {
                this.router.navigateByUrl('/home')
                break
              }
            }
            resolve(true);
          } else {
            resolve(false); // API response does not indicate success
          }
        })
        .catch(error => {
          console.log('Error checking session:', error);
          clearToken();
          reject(error); // Propagate the error for handling in the guard
        });
    });
  }
}
