import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingByValueComponent } from './billing-by-value.component';

describe('BillingByValueComponent', () => {
  let component: BillingByValueComponent;
  let fixture: ComponentFixture<BillingByValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingByValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingByValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
