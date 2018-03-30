import { Component, OnInit, Input } from '@angular/core';
import { ProductMix } from '../product-mix.model';
import { Observable } from 'rxjs/Rx';
import * as d3 from 'd3';

@Component({
  selector: 'app-product-mix-chart',
  templateUrl: './product-mix-chart.component.html',
  styleUrls: ['./product-mix-chart.component.css']
})
export class ProductMixChartComponent implements OnInit {
  @Input() productMixObservable: Observable<any>;
  productMix: ProductMix;
  constructor() { }

  ngOnInit() {
    this.productMixObservable.subscribe(
      response => {
        this.productMix = new ProductMix(response["dining"], response["seating"], response["bedroom"], response["youth"], response["occasional"], response["home"])
      }
    )
  }

}
