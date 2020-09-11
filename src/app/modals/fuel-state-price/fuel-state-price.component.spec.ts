import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelStatePriceComponent } from './fuel-state-price.component';

describe('FuelStatePriceComponent', () => {
  let component: FuelStatePriceComponent;
  let fixture: ComponentFixture<FuelStatePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelStatePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelStatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
