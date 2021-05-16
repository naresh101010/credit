import { TestBed } from '@angular/core/testing';

import { SalesDashboardService } from './sales-dashboard.service';

describe('SalesDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesDashboardService = TestBed.get(SalesDashboardService);
    expect(service).toBeTruthy();
  });
});
