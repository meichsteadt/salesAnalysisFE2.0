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

  getCustomers(pageNumber = 1, sortBy): Observable<any> {
    return this.http.get(this.url + "/customers?page_number=" + pageNumber + "&sort_by=" + sortBy, {headers: this.headers})
  }

  getProducts(pageNumber = 1, sortBy): Observable<any> {
    return this.http.get(this.url + "/products?page_number=" + pageNumber + "&sort_by=" + sortBy, {headers: this.headers})
  }

  getProductsByCategory(category, customerId = null, pageNumber = 1, sortBy = 'sales') {
    var url;
    if(customerId) {
      url = this.url + "/customers/" + customerId + "/categories/" + category
    }
    else {
      url = this.url + "/categories/" + category
    }
    return this.http.get(url + "?page_number=" + pageNumber + "&sort_by=" + sortBy, {headers: this.headers})
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

  getCustomerProducts(customerId, productId = null, pageNumber = 1, sortBy = "sales"): Observable<any> {
    if(productId) {
      return this.http.get(this.url + "/products/" + customerId + "/customer_products?page_number=" + pageNumber + "&sort_by=" + sortBy, {headers: this.headers})
    }
    else {
      return this.http.get(this.url + "/customers/" + customerId + "/customer_products?page_number=" + pageNumber + "&sort_by=" + sortBy, {headers: this.headers})
    }
  }

  getCustomer(id): Observable<any>  {
    return this.http.get(this.url + "/customers/" + id, {headers: this.headers})
  }

  getMissingBestSellers(customerId, pageNumber = 1) {
    return this.http.get(this.url + "/customers/" + customerId + "/missing_best_sellers?page_number=" + pageNumber, {headers: this.headers})
  }

  getMissingNewItems(customerId, pageNumber = 1) {
    return this.http.get(this.url + "/customers/" + customerId + "/missing_new_items?page_number=" + pageNumber, {headers: this.headers})
  }

  getRecommendations(customerId, pageNumber = 1) {
    return this.http.get(this.url + "/customers/" + customerId + "/recommendations?page_number=" + pageNumber, {headers: this.headers})
  }

  getProduct(id) {
    return this.http.get(this.url + "/products/" + id, {headers: this.headers})
  }

  getProductCustomers(productId, pageNumber = 1) {
    return this.http.get(this.url + "/products/" + productId + "/customer_products?page_number=" + pageNumber, {headers: this.headers})
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
        localStorage.setItem('homeleganceTimestamp', (new Date().getTime() + ""));
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

  getUserInfo(){
    return this.http.get(this.url + "/users", {headers: this.headers})
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

  search(query, pageNumber = 1) {
    return this.http.get(this.url + "/search?query=" + query + "&page_number=" + pageNumber, {headers: this.headers})
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
