import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email, password) {

  }

  getUser() {
    if(localStorage.getItem("homeleganceAuthToken") && this.tokenNotExpired()) {
      return localStorage.getItem("homeleganceAuthToken")
    }
    else {
      return ""
    }
  }

  removeToken() {
    localStorage.removeItem("homeleganceAuthToken")
  }

  tokenNotExpired() {
    var timeStamp = parseInt(localStorage.getItem("homeleganceTimestamp"));
    var now = new Date();
    var difference = ((now.getTime() - timeStamp) / 1000 / 60 / 60)
    return (difference >= 24 ? false : true);
  }
}
