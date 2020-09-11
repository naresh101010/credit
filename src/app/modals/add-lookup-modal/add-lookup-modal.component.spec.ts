import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLookupModalComponent } from './add-lookup-modal.component';

describe('AddLookupModalComponent', () => {
  let component: AddLookupModalComponent;
  let fixture: ComponentFixture<AddLookupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLookupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
