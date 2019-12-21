import { TestBed } from '@angular/core/testing';

import { ProductionSiteService } from './production-site.service';

describe('ProductionSiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductionSiteService = TestBed.get(ProductionSiteService);
    expect(service).toBeTruthy();
  });
});
