import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillDetailsComponent } from './waybill-details.component';

describe('WaybillDetailsComponent', () => {
  let component: WaybillDetailsComponent;
  let fixture: ComponentFixture<WaybillDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
