import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ActionButton } from '../../../../shared/components/action-button/action-button';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions'

@Component({
  selector: 'app-signup-set-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormInputComponent,
    ActionButton,
    MatButtonModule
  ],
  templateUrl: './signup-set-password.html',
  styleUrl: './signup-set-password.scss'
})
export class SignupSetPassword {
  @Input() email: string | null = null;
  @Input() loading: boolean | null = false;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: passwordMatchValidator
      }
    );
  }

  submit(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = this.form.value;
    const email = this.email as string;

    this.store.dispatch(
      AuthActions.setPassword({
        email,
        password: password!,
        confirmPassword: confirmPassword!
      })
    );
  }

}
