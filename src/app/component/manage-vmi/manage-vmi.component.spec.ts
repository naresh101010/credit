import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVmiComponent } from './manage-vmi.component';

describe('ManageVmiComponent', () => {
  let component: ManageVmiComponent;
  let fixture: ComponentFixture<ManageVmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
