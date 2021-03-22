import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBranchSearchComponent } from './dashboard-branch-search.component';

describe('DashboardBranchSearchComponent', () => {
  let component: DashboardBranchSearchComponent;
  let fixture: ComponentFixture<DashboardBranchSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBranchSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBranchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
