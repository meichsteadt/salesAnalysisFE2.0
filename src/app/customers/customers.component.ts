import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Customer } from '../customer.model';
import { SalesNumber } from '../sales-number.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [ApiService]
})
export class CustomersComponent implements OnInit {
  customersObservable: Observable<any>;
  salesNumbers: SalesNumber[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.customersObservable = this.api.getCustomers();
  }

  receiveCustomer(customer) {
    this.salesNumbers.push(new SalesNumber(
      customer.name,
      customer.salesYtd,
      customer.salesLastYear
    ))
  }

}
