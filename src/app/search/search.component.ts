import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product.model';
import { Customer } from '../customer.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ApiService]
})
export class SearchComponent implements OnInit {
  query: string;
  customers: Customer[] = [];
  products: Product[] = [];
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['search']) {
        this.query = params['search'];
        this.search();
      }
    })
  }

  search() {
    this.customers = [];
    this.products = [];
    this.api.search(this.query).subscribe(response => {
      response["customers"].map(customer => {
        this.customers.push(new Customer(
          customer["id"],
          customer["name"],
          null,
          null,
          null,
          customer["state"],
          null
        ))
      })
      response["products"].map(product => {
        this.products.push(new Product(
          product["id"],
          product["number"],
          null,
          null,
          product["category"],
          null
        ))
      })
    })
  }

}
