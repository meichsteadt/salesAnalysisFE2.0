import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { Product } from '../product.model';
import { SalesNumber } from '../sales-number.model';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductMix } from '../product-mix.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  providers: [ApiService]
})
export class CustomerDetailsComponent implements OnInit {
  customerId: number;
  customer: Customer;
  bestSellers: Observable<any>;
  salesNumbers: SalesNumber[] = [];
  productMix: Observable<any>;
  recommendations = [];
  promoPercentage: number;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.customerId = parseInt(urlParameters['id']);
      this.apiService.getCustomer(this.customerId).subscribe(response => {
        console.log(response);
        //create customer
        this.customer = new Customer(
          response["customer"]["id"],
          response["customer"]["name"],
          response["sales_ytd"],
          response["growth"],
          response["sales_last_year"],
          response["customer"]["state"],
          response["promo_percentage"]
        )

        this.recommendations = response["recommendations"];
      });

      this.bestSellers = this.apiService.getBestSellers(this.customerId);
      this.productMix = this.apiService.getProductMix(this.customerId);

      //get global promo percentage
      this.apiService.getPromoPercentage().subscribe(response => {
        this.promoPercentage = response["promo_percentage"];
      })
      //get sales numbers
      this.apiService.getSalesNumbers(this.customerId).subscribe(salesNumbers => {
        salesNumbers.map(salesNumber => {
          this.salesNumbers.push(new SalesNumber(
            salesNumber[0],
            salesNumber[1],
            salesNumber[2]
          ))
        })
      })
    });
  }

  percentReady() {
    if(this.promoPercentage && this.customer) {
      return true
    }
    else {
      return false
    }
  }

}
