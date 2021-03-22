import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutGenDetailShowComponent } from './payout-gen-detail-show.component';

describe('PayoutGenDetailShowComponent', () => {
  let component: PayoutGenDetailShowComponent;
  let fixture: ComponentFixture<PayoutGenDetailShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutGenDetailShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutGenDetailShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
