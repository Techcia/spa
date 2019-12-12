import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDataComponent } from './menu-data.component';

describe('MenuDataComponent', () => {
  let component: MenuDataComponent;
  let fixture: ComponentFixture<MenuDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
