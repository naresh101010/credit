import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeographyComponent } from './add-geography.component';

describe('AddGeographyComponent', () => {
  let component: AddGeographyComponent;
  let fixture: ComponentFixture<AddGeographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGeographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
