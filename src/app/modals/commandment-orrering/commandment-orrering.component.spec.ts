import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandmentOrreringComponent } from './commandment-orrering.component';

describe('CommandmentOrreringComponent', () => {
  let component: CommandmentOrreringComponent;
  let fixture: ComponentFixture<CommandmentOrreringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandmentOrreringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandmentOrreringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
