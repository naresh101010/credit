import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetroComponent } from './add-metro.component';

describe('AddMetroComponent', () => {
  let component: AddMetroComponent;
  let fixture: ComponentFixture<AddMetroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMetroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
