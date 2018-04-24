import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';

import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-missing-items',
  templateUrl: './missing-items.component.html',
  styleUrls: ['./missing-items.component.css']
})
export class MissingItemsComponent implements OnInit, OnChanges {
  @Input() newItemsObservable: Observable<any>;
  newItems: Product[] = [];
  @Input() bestSellersObservable: Observable<any>;
  bestSellers: Product[] = [];
  @Output() emitPage = new EventEmitter();
  @Output() emitTab = new EventEmitter();
  active: string = "bestSellers";
  bestSellersPages: number = 5;
  newItemsPages: number = 5;
  bestSellersPageNumber: number = 1;
  newItemsPageNumber: number = 1;
  constructor() { }

  ngOnInit() {
    $('.tabs').tabs();
  }

  ngOnChanges() {
    this.getProducts();
  }

  getProducts() {
    var products;
    var productsObservable;
    var pages;
    if(this.active === "bestSellers") {
      products = this.bestSellers;
      productsObservable = this.bestSellersObservable;
      pages = this.bestSellersPages;
    }
    else {
      products = this.newItems;
      productsObservable = this.newItemsObservable;
      pages = this.newItemsPages;
    }
    productsObservable.subscribe(response => {
      products.length = 0;
      response["arr"].map(product => {
        products.push(new Product(
          product["id"],
          product["number"],
          product["sales_year"],
          product["growth"],
          product["category"],
          null
        ))
      })
    })
  }

  setTab(tabName) {
    this.active = tabName;
    this.getProducts();
  }

  receivePage(pageNumber, tab) {
    if(tab === "bestSellers") {
      this.bestSellersPageNumber = pageNumber;
    }
    else {
      this.newItemsPageNumber = pageNumber;
    }
    var toEmit = {pageNumber: pageNumber, tab: this.active}
    this.emitPage.emit(toEmit);
  }

}
