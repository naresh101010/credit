import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintStickerComponent } from './print-sticker.component';

describe('PrintStickerComponent', () => {
  let component: PrintStickerComponent;
  let fixture: ComponentFixture<PrintStickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintStickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
