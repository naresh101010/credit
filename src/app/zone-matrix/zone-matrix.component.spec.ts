import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMatrixComponent } from './zone-matrix.component';

describe('ZoneMatrixComponent', () => {
  let component: ZoneMatrixComponent;
  let fixture: ComponentFixture<ZoneMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
