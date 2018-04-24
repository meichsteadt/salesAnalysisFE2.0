import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MaterializeModule } from 'angular2-materialize';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { SalesNumbersComponent } from './sales-numbers/sales-numbers.component';
import { NewItemsComponent } from './new-items/new-items.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ProductMixChartComponent } from './product-mix-chart/product-mix-chart.component';
import { SalesNumbersChartComponent } from './sales-numbers-chart/sales-numbers-chart.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { PromoPercentageComponent } from './promo-percentage/promo-percentage.component';
import { GrowthComponent } from './growth/growth.component';
import { MoneyPipe } from './money.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { MissingItemsComponent } from './missing-items/missing-items.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    CustomersComponent,
    CustomerDetailsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    BestSellersComponent,
    SalesNumbersComponent,
    NewItemsComponent,
    GroupsComponent,
    LoginComponent,
    SearchComponent,
    HomeComponent,
    SearchBarComponent,
    ProductListComponent,
    CustomerListComponent,
    ProductMixChartComponent,
    SalesNumbersChartComponent,
    RecommendationsComponent,
    PromoPercentageComponent,
    GrowthComponent,
    MoneyPipe,
    PaginationComponent,
    MissingItemsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    MaterializeModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
