import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmManifestModalComponent } from './confirm-manifest-modal.component';

describe('ConfirmManifestModalComponent', () => {
  let component: ConfirmManifestModalComponent;
  let fixture: ComponentFixture<ConfirmManifestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmManifestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmManifestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
