import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { AxiosInstance } from './common/axiosInstance';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Business manager';
  isLoading = true;
  user: UserInfo | null = null;
  axios = new AxiosInstance();
  router = new Router();

  constructor(private userInfoService: AuthService) {}

  ngOnInit(): void {
    this.userInfoService.user.subscribe((info) => {
      this.user = info;
    });

    const prefered_color_mode = localStorage.getItem('color_mode');
    const html = document.getElementsByTagName('html')[0];
    if (prefered_color_mode && html) {
      html.setAttribute('data-bs-theme', prefered_color_mode);
    }
  }

  toggleColorMode() {
    const html = document.getElementsByTagName('html')[0];
    const theme = html.getAttribute('data-bs-theme');
    const prefered = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color_mode', prefered);
    if (theme === 'dark') {
      html.setAttribute('data-bs-theme', 'light');
      return;
    }
    html.setAttribute('data-bs-theme', 'dark');
  }
}
