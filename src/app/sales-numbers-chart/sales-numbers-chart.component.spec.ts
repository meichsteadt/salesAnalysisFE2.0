import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesNumbersChartComponent } from './sales-numbers-chart.component';

describe('SalesNumbersChartComponent', () => {
  let component: SalesNumbersChartComponent;
  let fixture: ComponentFixture<SalesNumbersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesNumbersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesNumbersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
