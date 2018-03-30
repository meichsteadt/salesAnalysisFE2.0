import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMixChartComponent } from './product-mix-chart.component';

describe('ProductMixChartComponent', () => {
  let component: ProductMixChartComponent;
  let fixture: ComponentFixture<ProductMixChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMixChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMixChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
