import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AxiosResponse } from 'axios';
import { AxiosInstance } from '../../common/axiosInstance';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any[] = []
  axios = new AxiosInstance()
  isLoading = true
  ngOnInit() {
    this.fetchData()
  }

  private fetchData() {
    this.isLoading = true
    this.axios.get('/customers').then((resp: AxiosResponse<{status: string, customers: any[]}>) => {
      this.customers = resp.data.customers
    }).finally(() => {
      this.isLoading = false
    })
  }

  deleteCustomer(id: string) {
    if (window.confirm('If you proceed to delete this customer, all projects will be lost, confirm action?')) {
      this.axios.delete(`/customers/${id}`).then(() => {
        this.fetchData()
      })
    }
  }
}
