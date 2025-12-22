import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { SignupDialog } from '../signup-dialog/signup-dialog';
import {
  selectAuthLoading,
  selectAuthUser
} from '../store/auth.selectors';
import { LoginForm } from './login-form/login-form';
import { SignupStep } from '../models/auth.types';
import { Actions, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions'

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LoginForm
  ],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.scss'
})
export class LoginDialog implements OnDestroy {
  private store = inject(Store);
  private dialogRef = inject(MatDialogRef<LoginDialog>);
  private dialog = inject(MatDialog);

  private destroy$ = new Subject<void>();

  public loading$ = this.store.select(selectAuthLoading);

  constructor(private actions$: Actions) {
    this.actions$
      .pipe(
        ofType(AuthActions.openSignupFlow),
        takeUntil(this.destroy$)
      )
      .subscribe(({ email }) => {
        this.dialogRef.close();

        this.dialog.open(SignupDialog, {
          width: '100%',
          maxWidth: '420px',
          autoFocus: false,
          data: {
            email,
            startStep: SignupStep.VERIFY_OTP
          }
        });
      });

    this.store.select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.dialogRef.close();
        }
      });
  }

  @ViewChild(LoginForm) loginForm!: LoginForm;

  private getEmailFromForm(): string | null | undefined {
    return this.loginForm?.form.get('email')?.value;
  }

  public openSignup(): void {
    this.dialogRef.close();
    this.dialog.open(SignupDialog, {
      width: '100%',
      maxWidth: '420px',
      autoFocus: false
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
