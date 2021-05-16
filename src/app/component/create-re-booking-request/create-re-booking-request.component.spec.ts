import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReBookingRequestComponent } from './create-re-booking-request.component';

describe('CreateReBookingRequestComponent', () => {
  let component: CreateReBookingRequestComponent;
  let fixture: ComponentFixture<CreateReBookingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReBookingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReBookingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
