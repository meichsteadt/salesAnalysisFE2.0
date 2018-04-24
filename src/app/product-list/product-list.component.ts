import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() productsObservable: Observable<any>;
  @Input() sortBy: string;
  products: Product[] = [];
  @Input() title: string;
  pages: number = 1;
  pageNumber: number = 1;
  @Output() emitPage = new EventEmitter();
  @Output() emitSort = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.getProducts();
  }

  ngOnChanges() {
    this.getProducts();
  }

  getProducts() {
    this.productsObservable.subscribe(response => {
      this.products = [];
      response["arr"].map(product => {
        var number = (product["number"] ? product["number"] : product["product_number"])
        var id = (product["product_id"] ? product["product_id"] : product["id"])
        this.products.push(new Product(
          id,
          number,
          product["sales_year"],
          product["growth"],
          product["category"],
          null
        ))
      })
      this.pages = response["pages"];
    })
  }

  receivePage(pageNumber) {
    this.pageNumber = pageNumber;
    this.emitPage.emit(pageNumber);
  }

  growth(number) {
    return (number > 0 ? "positive" : "negative")
  }

  sorted(sortBy) {
    return (sortBy === this.sortBy ? true : false)
  }

  sendSortBy(sortBy) {
    if(sortBy !== this.sortBy) {
      this.emitSort.emit(sortBy);
      this.pageNumber = 1;
    }
  }
}
