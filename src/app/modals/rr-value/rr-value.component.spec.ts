/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RrValueComponent } from './rr-value.component';

describe('RrValueComponent', () => {
  let component: RrValueComponent;
  let fixture: ComponentFixture<RrValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
