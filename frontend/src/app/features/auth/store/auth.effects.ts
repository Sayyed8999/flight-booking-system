import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';

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

                // No stored auth → do nothing
                return { type: '[Auth] Noop' };
            })
        )
    );


    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),

            switchMap(({ email, password }) =>
                this.authService.login({ email, password }).pipe(

                    // 🔐 Persist auth
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

                        this.notify.error(err, 'Login failed');

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
                        // 🔄 Keep localStorage in sync
                        localStorage.setItem('auth_user', JSON.stringify(user));
                    }),

                    map(user =>
                        AuthActions.updateProfileSuccess({ user })
                    ),

                    catchError(err => {
                        this.notify.error(err, 'Failed to update profile');

                        return of(
                            AuthActions.updateProfileFailure({
                                error: err?.error?.message || 'Update failed'
                            })
                        );
                    })
                )
            )
        )
    );

}
