import { TestBed } from '@angular/core/testing';

import { DayEndService } from './day-end.service';

describe('DayEndService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayEndService = TestBed.get(DayEndService);
    expect(service).toBeTruthy();
  });
});
