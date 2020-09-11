import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuelStateComponent } from './add-fuel-state.component';

describe('AddFuelStateComponent', () => {
  let component: AddFuelStateComponent;
  let fixture: ComponentFixture<AddFuelStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFuelStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuelStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
