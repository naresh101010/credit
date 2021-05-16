import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReRoutingDashboardComponent } from './re-routing-dashboard.component';

describe('ReRoutingDashboardComponent', () => {
  let component: ReRoutingDashboardComponent;
  let fixture: ComponentFixture<ReRoutingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReRoutingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReRoutingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
