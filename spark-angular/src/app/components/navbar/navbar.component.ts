import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { clearToken } from '../../common/tokens';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: UserInfo | null = null;
  
  constructor(private userInfoService: AuthService) {}

  ngOnInit(): void {
    this.userInfoService.user.subscribe(
      (info) => {
        this.user = info
      }
    );
  }

  toggleColorMode() {
    const html = document.getElementsByTagName('html')[0];
    const theme = html.getAttribute('data-bs-theme');
    if (theme === 'dark') {
      html.setAttribute('data-bs-theme', 'light');
      return;
    }
    html.setAttribute('data-bs-theme', 'dark');
  }

  logOut() {
    clearToken()
    window.location.reload();
  }
}
