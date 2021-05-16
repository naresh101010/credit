import { TestBed } from '@angular/core/testing';

import { PreBookingService } from './pre-booking.service';

describe('PreBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreBookingService = TestBed.get(PreBookingService);
    expect(service).toBeTruthy();
  });
});
