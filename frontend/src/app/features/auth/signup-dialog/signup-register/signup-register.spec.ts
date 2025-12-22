import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRegister } from './signup-register';

describe('SignupRegister', () => {
  let component: SignupRegister;
  let fixture: ComponentFixture<SignupRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
