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
  customerProducts: Observable<any>;
  salesNumbers: SalesNumber[] = [];
  productMix: Observable<any>;
  recommendations: Observable<any>;
  promoPercentage: number;
  period: string = "previous 12 months";
  missingBestSellers: Observable<any>;
  missingNewItems: Observable<any>;
  sortBy: string = "sales";
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.customerId = parseInt(urlParameters['id']);
      this.apiService.getCustomer(this.customerId).subscribe(response => {
        //create customer
        this.customer = new Customer(
          response["customer"]["id"],
          response["customer"]["name"],
          response["customer"]["sales_year"],
          response["customer"]["growth"],
          response["customer"]["prev_sales_year"],
          response["customer"]["state"],
          response["promo_percentage"]
        )
      });

      //get best sellers
      this.customerProducts = this.apiService.getCustomerProducts(this.customerId, null, 1, this.sortBy);

      //get product mix
      this.productMix = this.apiService.getProductMix(this.customerId);

      //get missing best sellers
      this.missingBestSellers = this.apiService.getMissingBestSellers(this.customerId);

      //get missing new items
      this.missingNewItems = this.apiService.getMissingNewItems(this.customerId);

      //get global promo percentage
      this.apiService.getPromoPercentage().subscribe(response => {
        this.promoPercentage = response["promo_percentage"];
      })

      // get recommendations
      this.recommendations = this.apiService.getRecommendations(this.customerId, 1);

      //get sales numbers
      this.apiService.getSalesNumbers(this.customerId).subscribe(salesNumbers => {
        salesNumbers.map(salesNumber => {
          this.salesNumbers.push(new SalesNumber(
            salesNumber[0],
            salesNumber[1],
            salesNumber[2],
          ))
        })
      })
    });
  }

  receivePage(page) {
    this.customerProducts = this.apiService.getCustomerProducts(this.customerId, null, page, this.sortBy);
  }

  receiveSort(sortBy) {
    this.sortBy = sortBy;
    this.customerProducts = this.apiService.getCustomerProducts(this.customerId, null, 1, this.sortBy);
  }

  receiveMissingItems(event) {
    if(event.tab === "bestSellers") {
      this.missingBestSellers = this.apiService.getMissingBestSellers(this.customerId, event.pageNumber);
    }
    else if(event.tab === "newItems") {
      this.missingNewItems = this.apiService.getMissingNewItems(this.customerId, event.pageNumber);
    }
  }

  receivePeriod(period) {
    this.period = period;
  }

  receiveRecommendations(pageNumber) {
    this.recommendations = this.apiService.getRecommendations(this.customerId, pageNumber);
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
