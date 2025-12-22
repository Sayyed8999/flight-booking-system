import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupOtp } from './signup-otp';

describe('SignupOtp', () => {
  let component: SignupOtp;
  let fixture: ComponentFixture<SignupOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupOtp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
