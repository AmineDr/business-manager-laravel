import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiosInstance } from '../../common/axiosInstance';
import { AxiosResponse } from 'axios';
import { UtilsService } from '../../services/utils.service';


@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export class CustomerDetailsComponent implements OnInit {
  isLoading = true;
  customer_id: string | null = '';
  customer: any;
  router = new Router();
  axios = new AxiosInstance()

  constructor(private route: ActivatedRoute, public utilsService: UtilsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customer_id = params.get('id');
    });
    if (!this.customer_id) this.router.navigate(['/customers']);
    this.axios.get(`/customers/${this.customer_id}`)
      .then((resp: AxiosResponse<{ status: string; customer: any }>) => {
        this.customer = resp.data.customer;
      })
      .catch(() => this.router.navigate(['/customers']))
      .finally(() => {
        this.isLoading = false;
      });
  }

  deleteCustomer() {
    if (window.confirm('Confirm deletion?')) {
      if (this.customer.projects.length && !window.confirm('This customer has projects, if you proceed all the projects related will erased, are you sure you want to continue?')) return
      this.axios.delete(`/customers/${this.customer_id}`).then((resp) => {
        if (resp.data.status === "success") {
          this.router.navigateByUrl('/customers')
          return
        }
      }).catch((err) => console.log(err))
    }
  }
}
