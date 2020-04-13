import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountModifyComponent } from './bank-account-modify.component';

describe('BankAccountModifyComponent', () => {
  let component: BankAccountModifyComponent;
  let fixture: ComponentFixture<BankAccountModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
