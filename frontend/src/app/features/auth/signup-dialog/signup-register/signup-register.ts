import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ActionButton } from '../../../../shared/components/action-button/action-button';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions'

@Component({
  selector: 'app-signup-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormInputComponent,
    ActionButton
  ],
  templateUrl: './signup-register.html',
  styleUrl: './signup-register.scss'
})
export class SignupRegister {
  @Input() loading: boolean | null = false;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public submit(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { name, email } = this.form.getRawValue();

    this.store.dispatch(
      AuthActions.register({ name, email })
    );
  }
}
