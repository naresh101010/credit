import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanLoadPackagesComponent } from './scan-load-packages.component';

describe('ScanLoadPackagesComponent', () => {
  let component: ScanLoadPackagesComponent;
  let fixture: ComponentFixture<ScanLoadPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanLoadPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanLoadPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
