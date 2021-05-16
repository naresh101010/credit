import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateBookingComponent } from './initiate-booking.component';

describe('InitiateBookingComponent', () => {
  let component: InitiateBookingComponent;
  let fixture: ComponentFixture<InitiateBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
