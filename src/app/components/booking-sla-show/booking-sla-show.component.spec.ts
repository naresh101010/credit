import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSlaShowComponent } from './booking-sla-show.component';

describe('BookingSlaShowComponent', () => {
  let component: BookingSlaShowComponent;
  let fixture: ComponentFixture<BookingSlaShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSlaShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSlaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
