import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUgdRequestComponent } from './create-ugd-request.component';

describe('CreateUgdRequestComponent', () => {
  let component: CreateUgdRequestComponent;
  let fixture: ComponentFixture<CreateUgdRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUgdRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUgdRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
