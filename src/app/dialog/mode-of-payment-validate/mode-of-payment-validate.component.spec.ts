import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOfPaymentValidateComponent } from './mode-of-payment-validate.component';

describe('ModeOfPaymentValidateComponent', () => {
  let component: ModeOfPaymentValidateComponent;
  let fixture: ComponentFixture<ModeOfPaymentValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeOfPaymentValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOfPaymentValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
