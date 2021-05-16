import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReBookingDashboardComponent } from './re-booking-dashboard.component';

describe('ReBookingDashboardComponent', () => {
  let component: ReBookingDashboardComponent;
  let fixture: ComponentFixture<ReBookingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReBookingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReBookingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
