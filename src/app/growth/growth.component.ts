import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.css']
})
export class GrowthComponent implements OnInit {
  @Input() growth: number;
  constructor() { }

  ngOnInit() {
  }

  positive(){
    if(this.growth > 0) {
      return true
    }
    else {
      return false
    }
  }
}
