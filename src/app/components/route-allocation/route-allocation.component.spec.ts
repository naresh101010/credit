import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAllocationComponent } from './route-allocation.component';

describe('RouteAllocationComponent', () => {
  let component: RouteAllocationComponent;
  let fixture: ComponentFixture<RouteAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
