import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgdStartBookingComponent } from './ugd-start-booking.component';

describe('UgdStartBookingComponent', () => {
  let component: UgdStartBookingComponent;
  let fixture: ComponentFixture<UgdStartBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgdStartBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgdStartBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
