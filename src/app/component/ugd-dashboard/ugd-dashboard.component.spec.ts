import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgdDashboardComponent } from './ugd-dashboard.component';

describe('UgdDashboardComponent', () => {
  let component: UgdDashboardComponent;
  let fixture: ComponentFixture<UgdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
