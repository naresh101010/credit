import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaybillComponent } from './edit-waybill.component';

describe('EditWaybillComponent', () => {
  let component: EditWaybillComponent;
  let fixture: ComponentFixture<EditWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
