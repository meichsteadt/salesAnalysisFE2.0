import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css'],
  providers: [ApiService]
})
export class BestSellersComponent implements OnInit {
  dining: Observable<any>;
  bedroom: Observable<any>;
  seating: Observable<any>;
  youth: Observable<any>;
  occasional: Observable<any>;
  home: Observable<any>;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dining = this.api.getProductsByCategory("dining")
    this.bedroom = this.api.getProductsByCategory("bedroom")
    this.seating = this.api.getProductsByCategory("seating")
    this.youth = this.api.getProductsByCategory("youth")
    this.occasional = this.api.getProductsByCategory("occasional")
    this.home = this.api.getProductsByCategory("home")
  }

}
