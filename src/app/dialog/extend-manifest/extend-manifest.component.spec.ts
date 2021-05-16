import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendManifestComponent } from './extend-manifest.component';

describe('ExtendManifestComponent', () => {
  let component: ExtendManifestComponent;
  let fixture: ComponentFixture<ExtendManifestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendManifestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
