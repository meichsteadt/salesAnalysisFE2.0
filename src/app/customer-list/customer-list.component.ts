import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Customer } from '../customer.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnChanges {
  pages: number = 1;
  pageNumber: number = 1;
  customers: Customer[] = [];
  @Input() customersObservable: Observable<any>;
  @Input() title: string;
  @Input() sortBy: string;
  @Output() emitCustomer = new EventEmitter();
  @Output() emitPage = new EventEmitter();
  @Output() emitSort = new EventEmitter();
  constructor() { }

  ngOnChanges() {
    this.customersObservable.subscribe(response => {
      this.customers = [];
      response["arr"].map(customer => {
        var id = (customer["customer_id"] ? customer["customer_id"] : customer["id"])
        var newCustomer = new Customer(
          id,
          customer["name"],
          customer["sales_year"],
          customer["growth"],
          customer["prev_sales_year"],
          customer["state"],
          customer["promo_percentage"]
        )
        this.customers.push(newCustomer)
        this.emitCustomer.emit(newCustomer)
      })

      this.pages = response["pages"];
    })
  }

  growth(number) {
    return (number > 0 ? "positive" : "negative")
  }

  sorted(sortBy) {
    return (sortBy === this.sortBy ? true : false)
  }

  receivePage(pageNumber) {
    this.pageNumber = pageNumber;
    this.emitPage.emit(pageNumber);
  }

  sendSortBy(sortBy) {
    if(sortBy !== this.sortBy) {
      this.emitSort.emit(sortBy);
      this.pageNumber = 1;
    }
  }
}
