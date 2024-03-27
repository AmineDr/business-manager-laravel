import { Component, OnInit } from '@angular/core';
import { AxiosInstance } from '../../common/axiosInstance';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoading = true
  stats: any = null
  axios = new AxiosInstance()

  constructor (public utilsService: UtilsService) {}

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.isLoading = true
    this.axios.get('/user/stats').then((resp) => {
      this.stats = resp.data.stats
      console.log(resp.data)
    }).catch((err) => console.log(err))
  }

}
