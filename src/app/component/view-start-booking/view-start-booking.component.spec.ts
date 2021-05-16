import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStartBookingComponent } from './view-start-booking.component';

describe('ViewStartBookingComponent', () => {
  let component: ViewStartBookingComponent;
  let fixture: ComponentFixture<ViewStartBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStartBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStartBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
