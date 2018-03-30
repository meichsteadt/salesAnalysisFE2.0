import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer.model';
import { Product } from './product.model';
import { ProductMix } from './product-mix.model';
import { isDevMode } from '@angular/core';
import { backendConfig } from './api-keys';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {
  productMix: ProductMix;
  url: string;
  headers = new HttpHeaders({"Authorization": this.getUser()})

  constructor(private http: HttpClient, private router: Router){
    this.url = this.getUrl();
  }

  getUrl() {
    return isDevMode()? backendConfig.devUrl : backendConfig.url;
  }

  getCustomers(): Observable<any> {
    return this.http.get(this.url + "/customers", {headers: this.headers})
  }

  getProducts(): Observable<any> {
    return this.http.get(this.url + "/products", {headers: this.headers})
  }

  getProductsByCategory(category, customerId = null) {
    var url;
    if(customerId) {
      url = this.url + "/customers/" + customerId + "/categories" + category
    }
    else {
      url = this.url + "/categories/" + category
    }
    return this.http.get(url, {headers: this.headers})
  }

  getAllProductsByCategory(customerId = null) {
    var url;
    if(customerId) {
      url = this.url + "/customers/" + customerId + "/categories"
    }
    else {
      url = this.url + "/categories"
    }
    return this.http.get(url, {headers: this.headers})
  }

  getBestSellers(customerId = null): Observable<any> {
    var url;
    if(customerId) {
      url = this.url + "/customers/" + customerId + "/best_sellers";
    }
    else {
      url = this.url + "/best_sellers"
    }
    return this.http.get(url, {headers: this.headers})
  }

  getCustomer(id): Observable<any>  {
    return this.http.get(this.url + "/customers/" + id, {headers: this.headers})
  }

  getProduct(id) {
    return this.http.get(this.url + "/products/" + id, {headers: this.headers})
  }

  getProductCustomers(productId) {
    return this.http.get(this.url + "/customers?product_id=" + productId, {headers: this.headers})
  }

  getProductMix(customerId = null): Observable<Object> {
    var url;
    if(customerId) {
      url = this.url + "/customers/" + customerId + "/product_mix"
    }
    else {
      url = this.url + "/product_mix"
    }
    return this.http.get(url, {headers: this.headers})
  }

  login(email, password, _this) {
    this.http.post(this.url + "/authenticate", {email: email, password: password}).subscribe(
      token => {
        localStorage.setItem('homeleganceAuthToken', token['auth_token']);
        _this.success()
      },
      error => {
        _this.error(error)
      }
    )
  }

  logout() {
    localStorage.removeItem("homeleganceAuthToken");
    this.router.navigateByUrl('/login')
  }

  getUser() {
    if(localStorage.getItem("homeleganceAuthToken")) {
      return localStorage.getItem("homeleganceAuthToken")
    }
    else {
      return ""
    }
  }

  getSalesNumbers(customerId = null, productId = null, month = null, year = null): Observable<any> {
    var url = this.url;
    if(customerId) {
      url += "/customers/" + customerId + "/sales_numbers";
    }
    else if(productId) {
      url += "/products/" + productId + "/sales_numbers";
    }
    else {
      url += "/sales_numbers";
    }
    if(month || year) {
      url+= "?"
      if(month) {
        url+="month=" + month + "&";
      }
      if(year) {
        url+= "year=" + year;
      }
    }
    return this.http.get(url, {headers: this.headers})
  }

  search(query) {
    return this.http.get(this.url + "/search?query=" + query, {headers: this.headers})
  }

  getPromoPercentage() {
    return this.http.get(this.url + "/promo", {headers: this.headers})
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return null
    };
  }
}
