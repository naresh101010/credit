import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotepadComponent } from './edit-notepad.component';

describe('EditNotepadComponent', () => {
  let component: EditNotepadComponent;
  let fixture: ComponentFixture<EditNotepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
