import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillEWaybillComponent } from './waybill-ewaybill.component';

describe('WaybillEWaybillComponent', () => {
  let component: WaybillEWaybillComponent;
  let fixture: ComponentFixture<WaybillEWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillEWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillEWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
