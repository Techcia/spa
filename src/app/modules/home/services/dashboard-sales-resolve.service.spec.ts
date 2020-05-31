import { TestBed } from '@angular/core/testing';

import { DashboardSalesResolveService } from './dashboard-sales-resolve.service';

describe('DashboardSalesResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardSalesResolveService = TestBed.get(DashboardSalesResolveService);
    expect(service).toBeTruthy();
  });
});
