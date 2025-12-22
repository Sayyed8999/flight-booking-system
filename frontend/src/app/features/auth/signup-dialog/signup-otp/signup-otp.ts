import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ActionButton } from '../../../../shared/components/action-button/action-button';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions'

@Component({
  selector: 'app-signup-otp',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    ActionButton,
    ReactiveFormsModule,
    MatButtonModule,
    FormInputComponent
  ],
  templateUrl: './signup-otp.html',
  styleUrls: ['./signup-otp.scss']
})
export class SignupOtp {
  @Input() email: string | null = null;
  @Input() loading: boolean | null = false;
  @Input() redirectedFromLogin: boolean | null = false;

  resendDisabled = false;
  resendCountdown = 60;
  private resendTimer?: any;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  public ngOnInit(): void {
    if (this.redirectedFromLogin) {
      this.resendOtp()
    } else {
      this.startResendCooldown();
    }
  }

  public submit(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const otp = this.form.value.otp!;
    const email = this.email as string;

    this.store.dispatch(
      AuthActions.verifySignupOtp({ email, otp })
    );
  }

  private startResendCooldown(): void {
    this.resendDisabled = true;
    this.resendCountdown = 60;

    this.resendTimer = setInterval(() => {
      this.resendCountdown--;

      if (this.resendCountdown === 0) {
        this.resendDisabled = false;
        clearInterval(this.resendTimer);
      }
    }, 1000);
  }


  public resendOtp(): void {
    if (this.loading || this.resendDisabled) return;

    const email = this.email as string;

    this.store.dispatch(
      AuthActions.resendSignupOtp({ email })
    );

    this.startResendCooldown();
  }

  public ngOnDestroy(): void {
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
    }
  }


}
