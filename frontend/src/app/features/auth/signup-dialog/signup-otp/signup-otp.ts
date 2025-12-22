import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { ActionButton } from '../../../../shared/components/action-button/action-button';
import { AuthService } from '../../auth.service';
import { NotificationService } from '../../../../shared/services/notification.service';

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
  @Input() loading = false;

  @Output() verified = new EventEmitter<void>();

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: NotificationService
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

    this.loading = true;

    this.authService.verifySignupOtp({
      email: this.email as string,
      otp: this.form.value.otp!
    }).subscribe({
      next: () => {
        this.loading = false;
        this.verified.emit();
      },
      error: (err: any) => {
        this.loading = false;
        this.notify.error(err, 'Invalid OTP');
      }
    });
  }
}
