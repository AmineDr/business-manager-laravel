import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  user: UserInfo | null = null
  constructor (private authService: AuthService, public utilsService: UtilsService) {
    this.user = authService.getUserInfo()
  }
}
