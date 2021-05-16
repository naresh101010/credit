import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerPrintComponent } from './sticker-print.component';

describe('StickerPrintComponent', () => {
  let component: StickerPrintComponent;
  let fixture: ComponentFixture<StickerPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickerPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
