import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email, password) {

  }

  getUser() {
    if(localStorage.getItem("homeleganceAuthToken")) {
      return localStorage.getItem("homeleganceAuthToken")
    }
    else {
      return ""
    }
  }

  removeToken() {
    localStorage.removeItem("homeleganceAuthToken")
  }
}
