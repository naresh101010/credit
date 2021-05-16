import { TestBed } from '@angular/core/testing';

import { ManageVmiService } from './manage-vmi.service';

describe('ManageVmiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageVmiService = TestBed.get(ManageVmiService);
    expect(service).toBeTruthy();
  });
});
