import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundStartBookingComponent } from './outbound-start-booking.component';

describe('OutboundStartBookingComponent', () => {
  let component: OutboundStartBookingComponent;
  let fixture: ComponentFixture<OutboundStartBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundStartBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundStartBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
