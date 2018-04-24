import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnChanges {
  @Input() recommendationsObservable: Observable<any>;
  @Output() emitPage = new EventEmitter();
  recommendations: Product[] = [];
  pages: number;
  pageNumber: number = 1;
  constructor() { }

  ngOnChanges() {
    this.getProducts();
  }

  receivePage(pageNumber) {
    this.pageNumber = pageNumber;
    this.emitPage.emit(pageNumber);
  }

  getProducts() {
    this.recommendationsObservable.subscribe(response => {
      this.recommendations = [];
      console.log(response)
      response["arr"].map(product => {
        var number = (product["number"] ? product["number"] : product["product_number"])
        var id = (product["product_id"] ? product["product_id"] : product["id"])
        this.recommendations.push(new Product(
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

}
