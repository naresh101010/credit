import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGeneralTermsComponent } from './payment-general-terms.component';

describe('PaymentGeneralTermsComponent', () => {
  let component: PaymentGeneralTermsComponent;
  let fixture: ComponentFixture<PaymentGeneralTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGeneralTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGeneralTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
