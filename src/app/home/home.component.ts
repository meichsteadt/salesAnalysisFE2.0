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
  salesNumbers: SalesNumber[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    //get products
    this.products = this.api.getProducts()

    //get product mix
    this.productMix = this.api.getProductMix()

    //get customers
    this.customers = this.api.getCustomers()

    //get sales numbers
    this.api.getSalesNumbers().subscribe(salesNumbers => {
      salesNumbers.map((salesNumber) => {
        this.salesNumbers.push(new SalesNumber(
          salesNumber[0],
          salesNumber[1],
          salesNumber[2]
        ))
      })
    })
  }

}
