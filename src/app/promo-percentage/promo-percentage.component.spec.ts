import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoPercentageComponent } from './promo-percentage.component';

describe('PromoPercentageComponent', () => {
  let component: PromoPercentageComponent;
  let fixture: ComponentFixture<PromoPercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
