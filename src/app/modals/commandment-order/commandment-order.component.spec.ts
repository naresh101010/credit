import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandmentOrderComponent } from './commandment-order.component';

describe('CommandmentOrderComponent', () => {
  let component: CommandmentOrderComponent;
  let fixture: ComponentFixture<CommandmentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandmentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
