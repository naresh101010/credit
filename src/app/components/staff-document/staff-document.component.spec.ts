import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDocumentComponent } from './staff-document.component';

describe('StaffDocumentComponent', () => {
  let component: StaffDocumentComponent;
  let fixture: ComponentFixture<StaffDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
