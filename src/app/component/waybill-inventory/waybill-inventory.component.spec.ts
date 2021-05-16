import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillInventoryComponent } from './waybill-inventory.component';

describe('WaybillInventoryComponent', () => {
  let component: WaybillInventoryComponent;
  let fixture: ComponentFixture<WaybillInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
