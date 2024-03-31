import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { CustomerAddComponent } from './pages/customer-add/customer-add.component';
import { ProjectAddComponent } from './pages/project-add/project-add.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReAuthGuard } from './guards/re-auth.guard';

export const routes: Routes = [
  {
    path: "auth",
    canActivate: [ReAuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: ProjectsComponent,
          },
          {
            path: 'add',
            component: ProjectAddComponent,
          },
          {
            path: ':id',
            component: ProjectDetailsComponent,
          },
        ],
      },
      {
        path: 'customers',
        children: [
          {
            path: '',
            component: CustomersComponent,
          },
          {
            path: 'add',
            component: CustomerAddComponent,
          },
          {
            path: ':id',
            component: CustomerDetailsComponent,
          },
        ],
      },
    ],
  },
];
