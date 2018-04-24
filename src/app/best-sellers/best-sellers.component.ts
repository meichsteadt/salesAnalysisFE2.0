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
  diningSortBy: string = "sales";
  bedroomSortBy: string = "sales";
  seatingSortBy: string = "sales";
  youthSortBy: string = "sales";
  occasionalSortBy: string = "sales";
  homeSortBy: string = "sales";
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dining = this.api.getProductsByCategory("dining")
    this.bedroom = this.api.getProductsByCategory("bedroom")
    this.seating = this.api.getProductsByCategory("seating")
    this.youth = this.api.getProductsByCategory("youth")
    this.occasional = this.api.getProductsByCategory("occasional")
    this.home = this.api.getProductsByCategory("home")

  }

  receivePage(category, page) {
    switch(category){
      case "dining":
        this.dining = this.api.getProductsByCategory("dining", null, page, this.diningSortBy);
        break
      case "bedroom":
        this.bedroom = this.api.getProductsByCategory("bedroom", null, page, this.bedroomSortBy);
        break
      case "seating":
        this.seating = this.api.getProductsByCategory("seating", null, page, this.seatingSortBy);
        break
      case "youth":
        this.youth = this.api.getProductsByCategory("youth", null, page, this.youthSortBy);
        break
      case "occasional":
        this.occasional = this.api.getProductsByCategory("occasional", null, page, this.occasionalSortBy);
        break
      case "home":
        this.home = this.api.getProductsByCategory("home", null, page, this.homeSortBy);
        break
    }
  }

  receiveSort(category, sortBy) {
    switch(category){
      case "dining":
        this.dining = this.api.getProductsByCategory("dining", null, 1, sortBy);
        this.diningSortBy = sortBy;
        break
      case "bedroom":
        this.bedroom = this.api.getProductsByCategory("bedroom", null, 1, sortBy);
        this.bedroomSortBy = sortBy;
        break
      case "seating":
        this.seating = this.api.getProductsByCategory("seating", null, 1, sortBy);
        this.seatingSortBy = sortBy;
        break
      case "youth":
        this.youth = this.api.getProductsByCategory("youth", null, 1, sortBy);
        this.youthSortBy = sortBy;
        break
      case "occasional":
        this.occasional = this.api.getProductsByCategory("occasional", null, 1, sortBy);
        this.occasionalSortBy = sortBy;
        break
      case "home":
        this.home = this.api.getProductsByCategory("home", null, 1, sortBy);
        this.homeSortBy = sortBy;
        break
    }
  }

}
