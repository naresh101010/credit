import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleModelComponent } from './edit-vehicle-model.component';

describe('EditVehicleModelComponent', () => {
  let component: EditVehicleModelComponent;
  let fixture: ComponentFixture<EditVehicleModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehicleModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
