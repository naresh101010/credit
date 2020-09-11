import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommandmentComponent } from './create-commandment.component';

describe('CreateCommandmentComponent', () => {
  let component: CreateCommandmentComponent;
  let fixture: ComponentFixture<CreateCommandmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommandmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommandmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
