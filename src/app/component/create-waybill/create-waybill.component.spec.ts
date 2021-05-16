import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWaybillComponent } from './create-waybill.component';

describe('CreateWaybillComponent', () => {
  let component: CreateWaybillComponent;
  let fixture: ComponentFixture<CreateWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
