import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AxiosInstance } from '../../common/axiosInstance';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.css'
})
export class ProjectAddComponent {
  isLoading = false
  existingCustomer = false
  addProjectForm: FormGroup = new FormGroup({});
  customers: any[] = []
  axios = new AxiosInstance()
  router = new Router()
  goBack = true

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addProjectForm = this.fb.group({
      name: '',
      amount: 0,
      customer: '',
      existing_customer: false
    });

    this.axios.get('/customers').then((resp) => {
      if (resp.data.status === "success") {
        this.customers = resp.data.customers
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  toggleExistingCustomer() {
    this.existingCustomer = !this.existingCustomer
  }

  toggleGoBack() {
    this.goBack = !this.goBack
  }

  handleCustomerChange(e?: any) {
    
  }

  handleSubmit() {
    const data = this.validateFormData()
    if (!data) {
      alert("Invalid Data!")
      return
    }
    this.isLoading = true
    this.axios.post('/projects/add', {...data}).then((resp) => {
      console.log(resp.data);
      if (resp.data.status === "success") {
        if (this.goBack) {
          this.router.navigateByUrl('/projects')
          this.addProjectForm.reset()
        }
        return
      }
    }).catch((err: any) => {
      console.log(err);
    }).finally(() => {
      this.isLoading = false
    })
  }

  validateFormData() {
    const data = this.addProjectForm.value
    if (!data.name.length) return null
    if (!data.amount) return null
    if (!data.customer.length) return null
    return data
  }
}
