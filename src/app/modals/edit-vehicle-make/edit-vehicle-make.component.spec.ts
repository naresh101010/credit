import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleMakeComponent } from './edit-vehicle-make.component';

describe('EditVehicleMakeComponent', () => {
  let component: EditVehicleMakeComponent;
  let fixture: ComponentFixture<EditVehicleMakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehicleMakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
