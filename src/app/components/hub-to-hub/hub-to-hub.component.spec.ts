import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubToHubComponent } from './hub-to-hub.component';

describe('HubToHubComponent', () => {
  let component: HubToHubComponent;
  let fixture: ComponentFixture<HubToHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubToHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubToHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
