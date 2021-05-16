import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAmountConfirmationComponent } from './invoice-amount-confirmation.component';

describe('InvoiceAmountConfirmationComponent', () => {
  let component: InvoiceAmountConfirmationComponent;
  let fixture: ComponentFixture<InvoiceAmountConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceAmountConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceAmountConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
