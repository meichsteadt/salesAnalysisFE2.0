import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductMix } from '../product-mix.model';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ApiService]
})
export class ProductsComponent implements OnInit {
  products: Observable<any>;
  productMix;
  constructor(private api: ApiService) { }

  ngOnInit() {
    //get products
    this.products = this.api.getProducts()

    //get productMix
    this.productMix = this.api.getProductMix()
  }

}
