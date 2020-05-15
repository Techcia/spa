import { TestBed } from '@angular/core/testing';

import { ParkingListResolveService } from './parking-list-resolve.service';

describe('ParkingListResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkingListResolveService = TestBed.get(ParkingListResolveService);
    expect(service).toBeTruthy();
  });
});
