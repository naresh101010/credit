import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWaybillComponent } from './track-waybill.component';

describe('TrackWaybillComponent', () => {
  let component: TrackWaybillComponent;
  let fixture: ComponentFixture<TrackWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
