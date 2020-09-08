import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfxDialogComponent } from './sfx-dialog.component';

describe('SfxDialogComponent', () => {
  let component: SfxDialogComponent;
  let fixture: ComponentFixture<SfxDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfxDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
