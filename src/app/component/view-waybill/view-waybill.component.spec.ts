import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWaybillComponent } from './view-waybill.component';

describe('ViewWaybillComponent', () => {
  let component: ViewWaybillComponent;
  let fixture: ComponentFixture<ViewWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
