import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchPointConfirmationComponent } from './touch-point-confirmation.component';

describe('TouchPointConfirmationComponent', () => {
  let component: TouchPointConfirmationComponent;
  let fixture: ComponentFixture<TouchPointConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchPointConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchPointConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
