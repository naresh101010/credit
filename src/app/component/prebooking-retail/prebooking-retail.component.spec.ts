import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookingRetailComponent } from './prebooking-retail.component';

describe('PrebookingRetailComponent', () => {
  let component: PrebookingRetailComponent;
  let fixture: ComponentFixture<PrebookingRetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookingRetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookingRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
