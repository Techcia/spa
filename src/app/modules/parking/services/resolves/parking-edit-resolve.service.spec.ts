import { TestBed } from '@angular/core/testing';

import { ParkingEditResolveService } from './parking-edit-resolve.service';

describe('ParkingEditResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkingEditResolveService = TestBed.get(ParkingEditResolveService);
    expect(service).toBeTruthy();
  });
});
