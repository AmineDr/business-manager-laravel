import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AxiosResponse } from 'axios';
import { AxiosInstance } from '../../common/axiosInstance';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [RouterLink, NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {
  isLoading = true;

  project: ProjectDetailed | null = null;
  project_id: string | null = '';
  router = new Router();
  axios = new AxiosInstance();
  addInstallmentForm: FormGroup = new FormGroup({});
  addExpenseForm: FormGroup = new FormGroup({});
  constructor(private route: ActivatedRoute, private fb: FormBuilder, public utilsService: UtilsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.project_id = params.get('id');
    });
    if (!this.project_id) this.router.navigate(['/projects']);
    this.fetchData();
    this.addInstallmentForm = this.fb.group({
      amount: 0,
      project_id: this.project_id,
    });
    this.addExpenseForm = this.fb.group({
      amount: 0,
      project_id: this.project_id
    })
  }

  fetchData() {
    this.axios
      .get(`/projects/${this.project_id}`)
      .then(
        (resp: AxiosResponse<{ status: string; project: ProjectDetailed }>) => {
          this.project = resp.data.project;
        }
      )
      .catch(() => this.router.navigate(['/projects']))
      .finally(() => {
        this.isLoading = false;
      });
  }

  handleSubmit() {
    const data = this.validateFormData();
    if (!data) {
      alert('Invalid Data!');
      return;
    }
    this.axios
      .post('/installments', { ...data })
      .then((resp) => {
        if (resp.data.status === 'success') {
          this.fetchData();
          this.addInstallmentForm.setValue({
            amount: 0,
            project_id: this.project_id
          })
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  validateFormData() {
    const data = this.addInstallmentForm.value;
    if (!data.amount) return null;
    return data;
  }

  handleExpenseSubmit() {
    const data = this.validateExpenseFormData();
    if (!data) {
      alert("Invalid Data!");
      return
    }
    this.axios.post('/expenses', {...data}).then((resp) => {
      if (resp.data.status === "success") {
        this.fetchData();
        this.addExpenseForm.setValue({
          amount: 0,
          project_id: this.project_id
        })
      }
    })
  }

  validateExpenseFormData() {
    const data = this.addExpenseForm.value;
    if (!data.amount) return null;
    return data;
  }
  handleDelete(installment_id: number) {
    if (window.confirm('Confirm deletion?')) {
      this.axios
        .delete(`/installments/${installment_id}?project_id=${this.project_id}`)
        .then((resp) => {
          if (resp.data.status === "success") {
            this.fetchData();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  handleDeleteExpense(expense_id: number) {
    if (window.confirm('Confirm deletion?')) {
      this.axios
        .delete(`/expenses/${expense_id}?project_id=${this.project_id}`)
        .then((resp) => {
          if (resp.data.status === "success") {
            this.fetchData();
          }
        })
        .catch((err) => console.log(err));
    }
  }
}
