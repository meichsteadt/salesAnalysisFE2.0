import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-promo-percentage',
  templateUrl: './promo-percentage.component.html',
  styleUrls: ['./promo-percentage.component.css']
})
export class PromoPercentageComponent implements OnInit {
  @Input() percentage: number;
  @Input() globalPercentage: number;
  difference = {};
  constructor() { }

  ngOnInit() {
    this.getDifference();
  }

  getDifference() {
    this.difference["number"] = this.percentage - this.globalPercentage;
    if (this.difference["number"] > 0) {
      this.difference["message"] = "higher than the average customer"
    }
    else {
      this.difference["message"] = "lower than the average customer"
    }
    this.difference["number"] = Math.abs(this.difference["number"])
  }

}
