import { Component, OnInit } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api.service';

import { Product } from '../product.model';
import { ProductMix } from '../product-mix.model';
import { Customer } from '../customer.model';
import { SalesNumber } from '../sales-number.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  products: Observable<any>;
  customers: Observable<any>;
  productMix: Observable<any>;
  salesNumbers1: SalesNumber[] = [];
  salesNumbers2: SalesNumber[] = [];
  salesYtd: number;
  salesLastYear: number;
  salesYear: number;
  growth: number;
  period: string = "previous 12 months";
  today: Date = new Date();
  productsSortBy: string = "sales";
  customersSortBy: string = "sales";
  constructor(private api: ApiService) { }

  ngOnInit() {
    //get products
    this.getProducts(1);

    //get product mix
    this.productMix = this.api.getProductMix();

    //get customers
    this.getCustomers(1);

    //get salesYtd, growth, and salesLastYear
    this.api.getUserInfo().subscribe(response => {
      this.salesYtd = response["sales_year"];
      this.salesLastYear = response["prev_sales_year"];
      this.growth = response["growth"];
      this.salesYear = response["sales_year"]
    })

    //get sales numbers
    this.api.getSalesNumbers().subscribe(salesNumbers => {
      var tempArr = [];
      salesNumbers.map((salesNumber) => {
        this.salesNumbers1.push(new SalesNumber(
          salesNumber[0],
          salesNumber[1],
          salesNumber[2]
        ))
      })
    })

    this.api.getSalesNumbers(null, null, 10, 2017).subscribe(salesNumbers => {
      salesNumbers.map((salesNumber) => {
        this.salesNumbers2.push(new SalesNumber(
          salesNumber[0],
          salesNumber[1],
          salesNumber[2]
        ))
      })
    })

  }

  getProducts(pageNumber) {
    this.products = this.api.getProducts(pageNumber, this.productsSortBy);
  }

  getCustomers(page) {
    this.customers = this.api.getCustomers(page, this.customersSortBy);
  }

  receivePeriod(period) {
    this.period = period;
  }

  receiveProductPage(page) {
    this.getProducts(page);
  }

  receiveCustomerPage(page) {
    this.getCustomers(page);
  }

  receiveProductSortby(sortBy) {
    this.productsSortBy = sortBy;
    this.getProducts(1)
  }

  receiveCustomerSortby(sortBy) {
    this.customersSortBy = sortBy;
    this.getCustomers(1)
  }

}
