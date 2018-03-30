import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) { }
  email: string = "";
  password: string = "";
  ngOnInit() {
  }

  onSubmit(email, password) {
    $('.error').hide();
    var token = this.api.login(email, password, this);
  }

  success() {
    this.router.navigateByUrl('/')
  }

  error(error) {
    console.log(error);
    $('.error').show();
  }

}
