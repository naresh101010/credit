import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeCustomizeComponent } from './pincode-customize.component';

describe('PincodeCustomizeComponent', () => {
  let component: PincodeCustomizeComponent;
  let fixture: ComponentFixture<PincodeCustomizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeCustomizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
