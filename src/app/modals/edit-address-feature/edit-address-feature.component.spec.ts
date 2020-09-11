import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressFeatureComponent } from './edit-address-feature.component';

describe('EditAddressFeatureComponent', () => {
  let component: EditAddressFeatureComponent;
  let fixture: ComponentFixture<EditAddressFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
