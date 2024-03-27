import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AxiosInstance } from '../../common/axiosInstance';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {
  isLoading = false
  addCustomerForm: FormGroup = new FormGroup({});
  axios = new AxiosInstance()
  router = new Router()
  goBack = true
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addCustomerForm = this.fb.group({
      name: '',
      phone: '',
    });
    // this.addCustomerForm.valueChanges.subscribe(console.log);
  }

  handleSubmit() {
    const data = this.validateFormData()
    if (!data) {
      alert('Invalid Form Data!')
      return
    }
    this.isLoading = true
    this.axios.post('customers/add', {...data}).then((resp) => {
      alert("Success!")
      this.addCustomerForm.reset()
      if (this.goBack) {
        this.router.navigateByUrl('/customers')
      }
    }).catch((err) => console.log(err)
    ).finally(() => {
      this.isLoading = false
    })
  }

  toggleGoBack() {
    this.goBack = !this.goBack
  }

  validateFormData() {
    const data = this.addCustomerForm.value
    if (!data.name.length) return null
    if (!data.phone.length) return null
    return data
  }
}
