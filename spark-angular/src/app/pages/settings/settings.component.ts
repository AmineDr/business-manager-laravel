import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { UtilsService } from '../../services/utils.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AxiosInstance } from '../../common/axiosInstance';
import { Router } from '@angular/router';
import isEmail from 'validator/lib/isEmail';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  user: UserInfo | null = null;
  editForm: FormGroup = new FormGroup({});
  isLoading = false;
  axios = new AxiosInstance();
  router = new Router();
  invalid = true;

  constructor(
    private authService: AuthService,
    public utilsService: UtilsService,
    private fb: FormBuilder
  ) {
    this.user = authService.getUserInfo();
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
    this.editForm.valueChanges.subscribe(() => {
      if (!this.validateData()) {
        this.invalid = true;
        return;
      }
      this.invalid = false;
    });
  }

  handleSubmit(e: FormDataEvent) {
    e.preventDefault()
    const data = this.validateData();
    if (!data) {
      alert('Invalid Data!');
      return;
    }
    this.axios.patch('/user/self', { ...data }).then((resp) => {
      if (resp.status === 200) {
        alert('Updated user informations!');
        this.authService.setUserInfo(resp.data.userInfo as UserInfo);
      } else if (resp.status === 304) {
        alert('Nothing has changed');
      }
    }).finally(() => {
      this.editForm.setValue({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      })
    });
  }

  validateData() {
    const data = this.editForm.value;
    if (data.firstname.length && data.firstname.length < 3) return null;
    else if (data.lastname.length && data.lastname.length < 3) return null;
    else if (data.email.length && !isEmail(data.email)) return null;
    else if (data.password.length && data.password.length < 8) return null;

    data.email =
      data.email === this.authService.getUserInfo()?.email ? '' : data.email;

    for (const [key, value] of Object.entries(data)) if (typeof value === 'string' && value.length) return data
    return null;
  }
}
