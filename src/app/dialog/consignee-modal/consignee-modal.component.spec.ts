import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeModalComponent } from './consignee-modal.component';

describe('ConsigneeModalComponent', () => {
  let component: ConsigneeModalComponent;
  let fixture: ComponentFixture<ConsigneeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsigneeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
