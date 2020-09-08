import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandmentComponent } from './commandment.component';

describe('CommandmentComponent', () => {
  let component: CommandmentComponent;
  let fixture: ComponentFixture<CommandmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
