import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import isEmail from 'validator/lib/isEmail';
import { AxiosInstance } from '../../common/axiosInstance';
import { Router } from '@angular/router';
import { setToken } from '../../common/tokens';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  isLoading = false
  axios = new AxiosInstance()
  router = new Router()

  constructor (private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    if (this.authService.getUserInfo()) {
      this.router.navigateByUrl('/home')
    }
  }

  handleSubmit() {
    const data = this.validateFormData()
    if (!data) {
      alert("Invalid Data!")
      return
    }
    this.isLoading = true
    this.axios.post('/register', {...data}).then((resp) => {
      if (resp.status === 422) {
        alert("Email already registered!");
        return;
      }
      if (resp.data.status === "success") {
        setToken(resp.data.api_token)
        this.authService.setUserInfo(resp.data.userInfo)
        this.router.navigateByUrl('/home')
        return
      }
    }).catch((err) => console.log(err)).finally(() => {
      this.isLoading = false
    })
  }

  validateFormData() {
    const data = this.registerForm.value
    if (!data.firstname.length) return null
    if (!data.lastname.length) return null
    if (!isEmail(data.email)) return null
    if (data.password.length < 8) return null
    if (data.confirmPassword !== data.password) return null
    return data
  }
}
