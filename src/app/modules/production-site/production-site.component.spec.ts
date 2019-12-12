import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionSiteComponent } from './production-site.component';

describe('ProductionSiteComponent', () => {
  let component: ProductionSiteComponent;
  let fixture: ComponentFixture<ProductionSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
