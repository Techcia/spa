import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccessReprintComponent } from './modal-success-reprint.component';

describe('ModalSuccessReprintComponent', () => {
  let component: ModalSuccessReprintComponent;
  let fixture: ComponentFixture<ModalSuccessReprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSuccessReprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccessReprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
