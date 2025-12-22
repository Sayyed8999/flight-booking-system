import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSetPassword } from './signup-set-password';

describe('SignupSetPassword', () => {
  let component: SignupSetPassword;
  let fixture: ComponentFixture<SignupSetPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSetPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSetPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
