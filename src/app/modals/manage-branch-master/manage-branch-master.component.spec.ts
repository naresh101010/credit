import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBranchMasterComponent } from './manage-branch-master.component';

describe('ManageBranchMasterComponent', () => {
  let component: ManageBranchMasterComponent;
  let fixture: ComponentFixture<ManageBranchMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBranchMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBranchMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
