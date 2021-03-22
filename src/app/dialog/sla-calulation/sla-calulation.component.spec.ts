import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaCalulationComponent } from './sla-calulation.component';

describe('SlaCalulationComponent', () => {
  let component: SlaCalulationComponent;
  let fixture: ComponentFixture<SlaCalulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaCalulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaCalulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
