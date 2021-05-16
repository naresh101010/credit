import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRcptComponent } from './payment-rcpt.component';

describe('SfxDialogComponent', () => {
  let component: PaymentRcptComponent;
  let fixture: ComponentFixture<PaymentRcptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRcptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRcptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
