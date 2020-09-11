import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFeatureComponent } from './address-feature.component';

describe('AddressFeatureComponent', () => {
  let component: AddressFeatureComponent;
  let fixture: ComponentFixture<AddressFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
