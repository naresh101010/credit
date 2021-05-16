import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffDetailsComponent } from './view-staff-details.component';

describe('ViewStaffDetailsComponent', () => {
  let component: ViewStaffDetailsComponent;
  let fixture: ComponentFixture<ViewStaffDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStaffDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
