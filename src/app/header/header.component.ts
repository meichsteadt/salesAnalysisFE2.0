import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ApiService]
})
export class HeaderComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  logout() {
    this.api.logout();
  }

}
