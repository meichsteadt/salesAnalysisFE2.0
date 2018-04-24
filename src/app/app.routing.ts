import { ModuleWithProviders, Input }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { GroupsComponent } from './groups/groups.component';
import { NewItemsComponent } from './new-items/new-items.component';
import { SalesNumbersComponent } from './sales-numbers/sales-numbers.component';

import { AuthGuardService } from './auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'best-sellers',
    component: BestSellersComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'new-items',
    component: NewItemsComponent
  },
  {
    path: 'sales-numbers',
    component: SalesNumbersComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
