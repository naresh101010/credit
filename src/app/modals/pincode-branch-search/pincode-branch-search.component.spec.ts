import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeBranchSearchComponent } from './pincode-branch-search.component';

describe('PincodeBranchSearchComponent', () => {
  let component: PincodeBranchSearchComponent;
  let fixture: ComponentFixture<PincodeBranchSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeBranchSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeBranchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
