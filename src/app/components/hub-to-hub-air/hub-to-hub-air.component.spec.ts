import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubToHubAirComponent } from './hub-to-hub-air.component';

describe('HubToHubAirComponent', () => {
  let component: HubToHubAirComponent;
  let fixture: ComponentFixture<HubToHubAirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubToHubAirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubToHubAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
