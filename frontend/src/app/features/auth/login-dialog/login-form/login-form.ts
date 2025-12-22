import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../store/auth.actions';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ActionButton } from '../../../../shared/components/action-button/action-button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    ActionButton
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {

  @Input() loading = false;

  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  public submit(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.store.dispatch(
      AuthActions.login({
        email: email!,
        password: password!
      })
    );
  }
}
