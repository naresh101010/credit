import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandmentRrComponent } from './commandment-rr.component';

describe('CommandmentRrComponent', () => {
  let component: CommandmentRrComponent;
  let fixture: ComponentFixture<CommandmentRrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandmentRrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandmentRrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
