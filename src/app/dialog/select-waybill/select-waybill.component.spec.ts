import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWaybillComponent } from './select-waybill.component';

describe('SelectWaybillComponent', () => {
  let component: SelectWaybillComponent;
  let fixture: ComponentFixture<SelectWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
