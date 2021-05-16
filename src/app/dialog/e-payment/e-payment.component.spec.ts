import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpaymentRequestComponent } from './e-payment.component';

describe('EpaymentRequestComponent', () => {
  let component: EpaymentRequestComponent;
  let fixture: ComponentFixture<EpaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
