import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandmentOfferingsComponent } from './commandment-offerings.component';

describe('CommandmentOfferingsComponent', () => {
  let component: CommandmentOfferingsComponent;
  let fixture: ComponentFixture<CommandmentOfferingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandmentOfferingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandmentOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
