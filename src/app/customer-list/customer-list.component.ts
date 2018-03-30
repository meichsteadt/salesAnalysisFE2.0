import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @Input() customersObservable: Observable<any>;
  @Input() title: string;
  @Output() emitCustomer = new EventEmitter();
  customers: Customer[] = [];
  constructor() { }

  ngOnInit() {
    this.customersObservable.subscribe(response => {
      response.map(customer => {
        var newCustomer = new Customer(
          customer["customer"]["id"],
          customer["customer"]["name"],
          customer["sales_ytd"],
          customer["growth"],
          customer["sales_last_year"],
          customer["customer"]["state"],
          customer["promo_percentage"]
        )
        this.customers.push(newCustomer)
        this.emitCustomer.emit(newCustomer)
      })
    })
  }
}
