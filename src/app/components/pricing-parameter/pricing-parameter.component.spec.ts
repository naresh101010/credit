import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingParameterComponent } from './pricing-parameter.component';

describe('PricingParameterComponent', () => {
  let component: PricingParameterComponent;
  let fixture: ComponentFixture<PricingParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
