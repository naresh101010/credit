import { TestBed } from '@angular/core/testing';

import { WaybillService } from './waybill.service';

describe('WaybillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaybillService = TestBed.get(WaybillService);
    expect(service).toBeTruthy();
  });
});
