import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsaOprationComponent } from './msa-opration.component';

describe('MsaOprationComponent', () => {
  let component: MsaOprationComponent;
  let fixture: ComponentFixture<MsaOprationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsaOprationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsaOprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
