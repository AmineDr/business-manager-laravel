import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import isEmail from 'validator/lib/isEmail';
import { AxiosInstance } from '../../common/axiosInstance';
import { AxiosError, AxiosResponse } from 'axios';
import { setToken } from '../../common/tokens';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  title = 'Login';
  loginForm: FormGroup = new FormGroup({});
  userInfo: UserInfo | null = null;
  router = new Router();
  axios = new AxiosInstance();
  isLoading = false
  isValid = false

  constructor(private fb: FormBuilder, private userInfoService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
    this.loginForm.valueChanges.subscribe(() => {
      if (this.validateData()) {
        this.isValid = true
        return
      }
      this.isValid = false
    });
    if (this.userInfoService.getUserInfo()) {
      this.router.navigateByUrl('/home')
    }
  }

  handleLogin() {
    const data = this.validateData()
    if (!data) {
      alert('Invalid Data!')
      return
    };
    this.isLoading = true
    this.axios.post('/login', {...data}).then((resp: AxiosResponse<{status: string, token: string, userInfo: UserInfo}, any>) => {
      if (resp.data.status === "success") {
        setToken(resp.data.token)
        this.userInfoService.setUserInfo(resp.data.userInfo as UserInfo)
        this.router.navigateByUrl('/home')
        alert('Welcome')
      }
    }).catch((err: AxiosError) => console.log(err.status))
    .finally(() => {
      this.isLoading = false
    });
  }

  validateData() {
    const data = this.loginForm.value
    if (!data.email.length || !isEmail(data.email) || data.password.length < 8) return null;
    return data;
  }
}
