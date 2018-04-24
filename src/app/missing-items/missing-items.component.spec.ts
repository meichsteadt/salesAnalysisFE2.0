import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingItemsComponent } from './missing-items.component';

describe('MissingItemsComponent', () => {
  let component: MissingItemsComponent;
  let fixture: ComponentFixture<MissingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
