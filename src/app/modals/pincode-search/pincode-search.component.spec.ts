import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeSearchComponent } from './pincode-search.component';

describe('PincodeSearchComponent', () => {
  let component: PincodeSearchComponent;
  let fixture: ComponentFixture<PincodeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PincodeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PincodeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
