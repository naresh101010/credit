import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewConsigneeComponent } from './add-new-consignee.component';

describe('AddNewConsigneeComponent', () => {
  let component: AddNewConsigneeComponent;
  let fixture: ComponentFixture<AddNewConsigneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewConsigneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewConsigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
