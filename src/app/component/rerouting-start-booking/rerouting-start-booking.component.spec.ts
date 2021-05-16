import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReroutingStartBookingComponent } from './rerouting-start-booking.component';

describe('ReroutingStartBookingComponent', () => {
  let component: ReroutingStartBookingComponent;
  let fixture: ComponentFixture<ReroutingStartBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReroutingStartBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReroutingStartBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
