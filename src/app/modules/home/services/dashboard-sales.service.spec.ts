import { TestBed } from '@angular/core/testing';

import { DashboardSalesService } from './dashboard-sales.service';

describe('DashboardSalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardSalesService = TestBed.get(DashboardSalesService);
    expect(service).toBeTruthy();
  });
});
