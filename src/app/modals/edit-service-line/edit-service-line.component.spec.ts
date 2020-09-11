import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceLineComponent } from './edit-service-line.component';

describe('EditServiceLineComponent', () => {
  let component: EditServiceLineComponent;
  let fixture: ComponentFixture<EditServiceLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServiceLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
