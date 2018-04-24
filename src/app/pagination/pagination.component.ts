import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pages: number;
  @Input() pageNumber: number;
  @Output() emitPage = new EventEmitter();
  range = [];
  constructor() { }

  ngOnInit() {
    this.range = this.createRange(this.pageNumber);
  }

  createRange(pageNumber) {
    var arr = [];
    if(pageNumber > 3) {
      arr.push({"number": 1, "setNumber": 1, "onClick": this.setPage})
      arr.push({"number": "..", "setNumber": pageNumber - 2, "onClick": this.setPage});
    }
    else if(pageNumber > 2) {
      arr.push({"number": 1, "setNumber": 1, "onClick": this.setPage})
    }
    for(var i = 1; i<= this.pages; i ++) {
      if(
        i === pageNumber ||
        i === pageNumber - 1 ||
        i === pageNumber + 1
      ) {
        arr.push({"number": i, "setNumber": i, "onClick": this.setPage})
      }
    }
    if(pageNumber <= this.pages - 3) {
      arr.push({"number": "..", "setNumber": pageNumber + 2, "onClick": this.setPage});
      arr.push({"number": this.pages, "setNumber": this.pages, "onClick": this.setPage})
    }
    else if(pageNumber <= this.pages - 2) {
      arr.push({"number": this.pages, "setNumber": this.pages, "onClick": this.setPage})
    }
    return arr;
  }

  setPage(i, eventEmitter, _this = this) {
    eventEmitter.emit(i);
    _this.range = _this.createRange(i)
  }

  active(i) {
    if(i === this.pageNumber) {
      return true;
    }
    else {
      return false;
    }
  }

  previousPage() {
    var page = (this.pageNumber === 1 ? this.pages : this.pageNumber - 1)
    this.setPage(page, this.emitPage)
  }

  nextPage() {
    var page = (this.pageNumber === this.pages ? 1 : this.pageNumber + 1)
    this.setPage(page, this.emitPage)
  }

  hello() {
    console.log("hello");
  }
}
