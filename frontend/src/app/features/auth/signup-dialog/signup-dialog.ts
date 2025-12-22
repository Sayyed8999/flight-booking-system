import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupRegister } from './signup-register/signup-register';
import { SignupOtp } from './signup-otp/signup-otp';
import { SignupSetPassword } from './signup-set-password/signup-set-password';
import { MatIconModule } from '@angular/material/icon';
import { SignupStep } from '../models/auth.types';

import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { selectAuthLoading } from '../store/auth.selectors';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    SignupRegister,
    SignupOtp,
    SignupSetPassword
  ],
  templateUrl: './signup-dialog.html',
  styleUrl: './signup-dialog.scss'
})
export class SignupDialog {
  protected readonly SignupStep = SignupStep;

  public currentStep: SignupStep = SignupStep.REGISTER;
  public email: string | null = null;
  public redirectedFromLogin = false;

  public loading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private actions$: Actions,
    private dialogRef: MatDialogRef<SignupDialog>,
    @Inject(MAT_DIALOG_DATA) public data?: {
      email?: string;
      startStep?: SignupStep;
    }) {
    if (data?.email) {
      this.email = data.email;
    }
    if (data?.startStep) {
      this.currentStep = data.startStep;
      this.redirectedFromLogin = true
    }
    this.bindAuthFlow();

  }

  public ngOnInit(): void {
    this.loading$ = this.store.select(selectAuthLoading);
  }

  private bindAuthFlow(): void {
    this.actions$
      .pipe(
        ofType(
          AuthActions.registerSuccess,
          AuthActions.verifySignupOtpSuccess,
          AuthActions.setPasswordSuccess
        ),
        takeUntilDestroyed()
      )
      .subscribe(action => {

        switch (action.type) {

          case AuthActions.registerSuccess.type:
            this.email = action.email;
            this.currentStep = SignupStep.VERIFY_OTP;
            break;

          case AuthActions.verifySignupOtpSuccess.type:
            this.currentStep = SignupStep.SET_PASSWORD;
            break;

          case AuthActions.setPasswordSuccess.type:
            this.dialogRef.close(true);
            break;
        }
      });
  }

  public setCurrentStep(step: SignupStep): void {
    this.currentStep = step;
  }

  public closeDialog(): void {
    this.store.dispatch(
      AuthActions.setInitialState()
    );
    this.dialogRef.close();
  }

  get canGoBack(): boolean {
    if (this.redirectedFromLogin) {
      return false;
    }
    return this.currentStep !== SignupStep.REGISTER;
  }

  public goBack(): void {
    switch (this.currentStep) {
      case SignupStep.VERIFY_OTP:
        this.setCurrentStep(SignupStep.REGISTER);
        break;

      case SignupStep.SET_PASSWORD:
        this.setCurrentStep(SignupStep.VERIFY_OTP);
        break;
    }
  }


}
