import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardBookingComponent } from './forward-booking.component';

describe('ForwardBookingComponent', () => {
  let component: ForwardBookingComponent;
  let fixture: ComponentFixture<ForwardBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
