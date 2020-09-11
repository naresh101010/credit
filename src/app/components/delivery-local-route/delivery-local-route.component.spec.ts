import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocalRouteComponent } from './delivery-local-route.component';

describe('DeliveryLocalRouteComponent', () => {
  let component: DeliveryLocalRouteComponent;
  let fixture: ComponentFixture<DeliveryLocalRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocalRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocalRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
