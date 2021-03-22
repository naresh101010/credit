import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPayoutShowComponent } from './booking-payout-show.component';

describe('BookingPayoutShowComponent', () => {
  let component: BookingPayoutShowComponent;
  let fixture: ComponentFixture<BookingPayoutShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingPayoutShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPayoutShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
