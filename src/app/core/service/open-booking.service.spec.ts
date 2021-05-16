import { TestBed } from '@angular/core/testing';

import { OpenBookingService } from './open-booking.service';

describe('OpenBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenBookingService = TestBed.get(OpenBookingService);
    expect(service).toBeTruthy();
  });
});
