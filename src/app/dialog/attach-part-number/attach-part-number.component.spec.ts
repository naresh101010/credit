import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachPartNumberComponent } from './attach-part-number.component';

describe('AttachPartNumberComponent', () => {
  let component: AttachPartNumberComponent;
  let fixture: ComponentFixture<AttachPartNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachPartNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachPartNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
