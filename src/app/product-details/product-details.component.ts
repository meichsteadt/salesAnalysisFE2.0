import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { Product } from '../product.model';
import { SalesNumber } from '../sales-number.model';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ApiService]

})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productId: number;
  salesNumbers: SalesNumber[] = [];
  customers: Observable<any>;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.productId = parseInt(urlParameters['id']);
      this.apiService.getProduct(this.productId).subscribe(response => {
        //create product
        this.product = new Product(
          response["id"],
          response["number"],
          response["sales_year"],
          response["growth"],
          response["category"],
          response["prev_sales_year"]
        )
      });

      this.apiService.getSalesNumbers(null, this.productId).subscribe(salesNumbers => {
        salesNumbers.map(salesNumber => {
          this.salesNumbers.push(new SalesNumber(
            salesNumber[0],
            salesNumber[1],
            salesNumber[2]
          ))
        })
      })
      this.customers = this.apiService.getProductCustomers(this.productId);
    });
  }

  receivePage(page) {
    this.customers = this.apiService.getProductCustomers(this.productId, page);
  }
}
