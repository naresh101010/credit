import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReRoutingRequestComponent } from './create-re-routing-request.component';

describe('CreateReRoutingRequestComponent', () => {
  let component: CreateReRoutingRequestComponent;
  let fixture: ComponentFixture<CreateReRoutingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReRoutingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReRoutingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
