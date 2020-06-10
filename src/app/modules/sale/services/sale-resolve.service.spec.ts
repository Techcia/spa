import { TestBed } from '@angular/core/testing';

import { SaleResolveService } from './sale-resolve.service';

describe('SaleResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleResolveService = TestBed.get(SaleResolveService);
    expect(service).toBeTruthy();
  });
});
