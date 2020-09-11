import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubToHubLocalComponent } from './hub-to-hub-local.component';

describe('HubToHubLocalComponent', () => {
  let component: HubToHubLocalComponent;
  let fixture: ComponentFixture<HubToHubLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubToHubLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubToHubLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
