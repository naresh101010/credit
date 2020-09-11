import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateGroupComponent } from './rate-group.component';

describe('RateGroupComponent', () => {
  let component: RateGroupComponent;
  let fixture: ComponentFixture<RateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
