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
  salesYtd: number = 0;
  salesLastYear: number = 0;
  sortBy: string = "sales";
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.customersObservable = this.api.getCustomers(1, "sales");
  }

  receiveCustomer(customer) {
    this.salesNumbers.push(new SalesNumber(
      customer.name,
      customer.salesYtd,
      customer.salesLastYear
    ))
    this.salesYtd += parseFloat(customer.salesYtd);
    this.salesLastYear += parseFloat(customer.salesLastYear);
  }

  receivePage(page) {
    this.resetSalesNumbers();
    this.customersObservable = this.api.getCustomers(page, this.sortBy);
  }

  receiveSortBy(sortBy){
    this.resetSalesNumbers();
    this.sortBy = sortBy;
    this.customersObservable = this.api.getCustomers(1, sortBy);
  }

  resetSalesNumbers() {
    this.salesNumbers = [];
    this.salesYtd = 0;
    this.salesLastYear = 0;
  }

}
