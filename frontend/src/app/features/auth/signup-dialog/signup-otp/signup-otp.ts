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

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  submit(): void {
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

}
