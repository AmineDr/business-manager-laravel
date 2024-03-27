import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { RegisterComponent } from './pages/register/register.component';
import { CustomerAddComponent } from './pages/customer-add/customer-add.component';
import { ProjectAddComponent } from './pages/project-add/project-add.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: 'add',
        component: ProjectAddComponent
      },
      {
        path: ':id',
        component: ProjectDetailsComponent,
      },
    ]
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CustomersComponent,
      },
      {
        path: 'add',
        component: CustomerAddComponent
      },
      {
        path: ':id',
        component: CustomerDetailsComponent,
      },
    ],
  },
];
