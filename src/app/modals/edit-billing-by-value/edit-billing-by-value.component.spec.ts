import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingByValueComponent } from './edit-billing-by-value.component';

describe('EditBillingByValueComponent', () => {
  let component: EditBillingByValueComponent;
  let fixture: ComponentFixture<EditBillingByValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillingByValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillingByValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
