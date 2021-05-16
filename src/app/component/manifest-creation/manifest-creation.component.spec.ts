import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestCreationComponent } from './manifest-creation.component';

describe('ManifestCreationComponent', () => {
  let component: ManifestCreationComponent;
  let fixture: ComponentFixture<ManifestCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
