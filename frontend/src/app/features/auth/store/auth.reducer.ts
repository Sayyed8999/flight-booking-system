import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.login, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.loginSuccess, (state, { user, token }) => ({
        ...state,
        user,
        token,
        loading: false
    })),

    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(AuthActions.openSignupFlow, (state) => ({
        ...state,
        loading: false
    })),

    on(AuthActions.logout, () => initialAuthState),
    on(AuthActions.setInitialState, () => initialAuthState),

    on(AuthActions.updateProfile, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(AuthActions.updateProfileSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false
    })),

    on(AuthActions.updateProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(AuthActions.resendSignupOtp, state => ({
        ...state,
        loading: true
    })),
    on(
        AuthActions.resendSignupOtpSuccess,
        AuthActions.resendSignupOtpFailure,
        state => ({
            ...state,
            loading: false
        })
    )
);
