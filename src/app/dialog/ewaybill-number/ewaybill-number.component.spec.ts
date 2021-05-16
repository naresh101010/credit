import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwaybillNumberComponent } from './ewaybill-number.component';

describe('EwaybillNumberComponent', () => {
  let component: EwaybillNumberComponent;
  let fixture: ComponentFixture<EwaybillNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwaybillNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwaybillNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
