import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManifestComponent } from './update-manifest.component';

describe('UpdateManifestComponent', () => {
  let component: UpdateManifestComponent;
  let fixture: ComponentFixture<UpdateManifestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateManifestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
