import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() productsObservable: Observable<any>;
  products: Product[] = [];
  @Input() title: string;
  constructor() { }

  ngOnInit() {
    this.productsObservable.subscribe(response => {
      response.map(product => {
        this.products.push(new Product(
          product["product"]["id"],
          product["product"]["number"],
          product["sales_ytd"],
          product["growth"],
          product["product"]["category"],
          null
        ))
      })
    })
  }

}
