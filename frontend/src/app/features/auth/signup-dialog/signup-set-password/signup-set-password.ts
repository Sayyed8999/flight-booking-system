import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ActionButton } from '../../../../shared/components/action-button/action-button';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthService } from '../../auth.service';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

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
  @Input() loading = false;

  @Output() signupComplete = new EventEmitter<boolean>();

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotificationService
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

    this.loading = true;

    this.authService.setPassword({
      email: this.email as string,
      password: password!,
      confirmPassword: confirmPassword!
    }).subscribe({
      next: () => {
        this.notify.success('Account created successfully');
        this.signupComplete.emit(true);
        this.loading = false;
      },
      error: (err) => {
        this.notify.error(err, 'Failed to set password');
        this.loading = false;
      }
    });
  }
}
