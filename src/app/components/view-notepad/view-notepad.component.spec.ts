import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotepadComponent } from './view-notepad.component';

describe('ViewNotepadComponent', () => {
  let component: ViewNotepadComponent;
  let fixture: ComponentFixture<ViewNotepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNotepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
