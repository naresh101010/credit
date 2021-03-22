import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledPayoutComponent } from './scheduled-payout.component';

describe('ScheduledPayoutComponent', () => {
  let component: ScheduledPayoutComponent;
  let fixture: ComponentFixture<ScheduledPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
