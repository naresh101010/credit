import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptymdmcomponentComponent } from './emptymdmcomponent.component';

describe('EmptymdmcomponentComponent', () => {
  let component: EmptymdmcomponentComponent;
  let fixture: ComponentFixture<EmptymdmcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptymdmcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptymdmcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
