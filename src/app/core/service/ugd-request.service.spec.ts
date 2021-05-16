import { TestBed } from '@angular/core/testing';

import { UgdRequestService } from './ugd-request.service';

describe('UgdRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UgdRequestService = TestBed.get(UgdRequestService);
    expect(service).toBeTruthy();
  });
});
