import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesNumbersComponent } from './sales-numbers.component';

describe('SalesNumbersComponent', () => {
  let component: SalesNumbersComponent;
  let fixture: ComponentFixture<SalesNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
