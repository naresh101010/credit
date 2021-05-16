import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelcompComponent } from './cancelcomp.component';

describe('CancelcompComponent', () => {
  let component: CancelcompComponent;
  let fixture: ComponentFixture<CancelcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
