import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AxiosResponse } from 'axios';
import { AxiosInstance } from '../../common/axiosInstance';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = []
  isLoading = true
  axios = new AxiosInstance()
  ngOnInit() {
    this.fetchData()
  }

  private fetchData() {
    this.isLoading = true
    this.axios.get('/projects').then((resp: AxiosResponse<{status: string, projects: any[]}>) => {
      this.projects = resp.data.projects
    }).finally(() => {
      this.isLoading = false
    })
  }

  deleteProject(id: string) {
    this.axios.delete(`/projects/${id}`).then(() => {
      this.fetchData()
    })
  }
}

