import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookingCreateWaybillComponent } from './prebooking-create-waybill.component';

describe('PrebookingCreateWaybillComponent', () => {
  let component: PrebookingCreateWaybillComponent;
  let fixture: ComponentFixture<PrebookingCreateWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookingCreateWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookingCreateWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
