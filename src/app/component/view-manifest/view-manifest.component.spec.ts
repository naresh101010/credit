import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManifestComponent } from './view-manifest.component';

describe('ViewManifestComponent', () => {
  let component: ViewManifestComponent;
  let fixture: ComponentFixture<ViewManifestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewManifestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
