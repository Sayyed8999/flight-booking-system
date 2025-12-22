import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private notify = inject(NotificationService);
    private router = inject(Router);

    initAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.initAuth),

            map(() => {
                const token = localStorage.getItem('auth_token');
                const user = localStorage.getItem('auth_user');

                if (token && user) {
                    return AuthActions.loginSuccess({
                        token,
                        user: JSON.parse(user)
                    });
                }

                return { type: '[Auth] Noop' };
            })
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),

            switchMap(({ email, password }) =>
                this.authService.login({ email, password }).pipe(

                    tap(({ token, user }) => {
                        localStorage.setItem('auth_token', token);
                        localStorage.setItem('auth_user', JSON.stringify(user));
                    }),

                    map(({ user, token }) =>
                        AuthActions.loginSuccess({ user, token })
                    ),

                    catchError(err => {
                        const message = err?.error?.message;

                        if (message === 'Password not set') {
                            return of(
                                AuthActions.loginFailure({
                                    error: message,
                                    code: 'PASSWORD_NOT_SET'
                                })
                            );
                        }

                        return of(
                            AuthActions.loginFailure({
                                error: message || 'Login failed',
                                code: 'INVALID_CREDENTIALS'
                            })
                        );
                    })
                )
            )
        )
    );

    loginFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_user');
                    this.router.navigate(['/flights']);
                })
            ),
        { dispatch: false }
    );

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateProfile),

            switchMap(({ name }) =>
                this.authService.updateProfile({ name }).pipe(

                    tap(user => {
                        localStorage.setItem('auth_user', JSON.stringify(user));
                    }),

                    map(user =>
                        AuthActions.updateProfileSuccess({ user })
                    ),

                    catchError(err =>
                        of(
                            AuthActions.updateProfileFailure({
                                error: err?.error?.message || 'Update failed'
                            })
                        )
                    )
                )
            )
        )
    );

    updateProfileSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.updateProfileSuccess),
                tap(() => {
                    this.notify.success('Profile updated successfully');
                })
            ),
        { dispatch: false }
    );

    updateProfileFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.updateProfileFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),

            switchMap(({ name, email }) =>
                this.authService.register({ name, email }).pipe(

                    map(() =>
                        AuthActions.registerSuccess({ email })
                    ),

                    catchError(err =>
                        of(
                            AuthActions.registerFailure({
                                error: err?.error?.message || 'Failed to send OTP'
                            })
                        )
                    )
                )
            )
        )
    );

    registerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.registerSuccess),
                tap(() => {
                    this.notify.success('OTP sent successfully');
                })
            ),
        { dispatch: false }
    );

    registerFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.registerFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );

    verifySignupOtp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.verifySignupOtp),

            switchMap(({ email, otp }) =>
                this.authService.verifySignupOtp({ email, otp }).pipe(

                    map(() =>
                        AuthActions.verifySignupOtpSuccess()
                    ),

                    catchError(err =>
                        of(
                            AuthActions.verifySignupOtpFailure({
                                error: err?.error?.message || 'Invalid OTP'
                            })
                        )
                    )
                )
            )
        )
    );

    verifySignupOtpSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.verifySignupOtpSuccess),
                tap(() => {
                    this.notify.success('OTP verified successfully');
                })
            ),
        { dispatch: false }
    );

    verifySignupOtpFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.verifySignupOtpFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );

    setPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.setPassword),

            switchMap(({ email, password, confirmPassword }) =>
                this.authService
                    .setPassword({ email, password, confirmPassword })
                    .pipe(

                        map(() =>
                            AuthActions.setPasswordSuccess()
                        ),

                        catchError(err =>
                            of(
                                AuthActions.setPasswordFailure({
                                    error: err?.error?.message || 'Failed to set password'
                                })
                            )
                        )
                    )
            )
        )
    );

    setPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.setPasswordSuccess),
                tap(() => {
                    this.notify.success('Account created successfully');
                })
            ),
        { dispatch: false }
    );

    setPasswordFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.setPasswordFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );



}
