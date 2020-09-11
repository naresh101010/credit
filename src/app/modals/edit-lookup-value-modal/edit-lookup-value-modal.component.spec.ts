import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLookupValueModalComponent } from './edit-lookup-value-modal.component';

describe('EditLookupValueModalComponent', () => {
  let component: EditLookupValueModalComponent;
  let fixture: ComponentFixture<EditLookupValueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLookupValueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLookupValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
