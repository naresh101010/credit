import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeFeatureComponent } from './pincode-feature.component';

describe('PincodeFeatureComponent', () => {
  let component: PincodeFeatureComponent;
  let fixture: ComponentFixture<PincodeFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
