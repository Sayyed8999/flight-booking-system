import { createAction, props } from '@ngrx/store';
import { AuthUser } from './auth.state';

export const initAuth = createAction('[Auth] Init Auth');

export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: AuthUser; token: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string; code?: 'PASSWORD_NOT_SET' | 'INVALID_CREDENTIALS' }>()
);

export const logout = createAction('[Auth] Logout');
export const setInitialState = createAction('[Auth] Set initial State');


export const updateProfile = createAction(
    '[Auth] Update Profile',
    props<{ name: string }>()
);

export const updateProfileSuccess = createAction(
    '[Auth] Update Profile Success',
    props<{ user: AuthUser }>()
);

export const updateProfileFailure = createAction(
    '[Auth] Update Profile Failure',
    props<{ error: string }>()
);

export const register = createAction(
    '[Auth] Register',
    props<{ name: string; email: string }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ email: string }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: string }>()
);

export const verifySignupOtp = createAction(
    '[Auth] Verify Signup OTP',
    props<{ email: string; otp: string }>()
);

export const verifySignupOtpSuccess = createAction(
    '[Auth] Verify Signup OTP Success'
);

export const verifySignupOtpFailure = createAction(
    '[Auth] Verify Signup OTP Failure',
    props<{ error: string }>()
);

export const setPassword = createAction(
    '[Auth] Set Password',
    props<{
        email: string;
        password: string;
        confirmPassword: string;
    }>()
);

export const setPasswordSuccess = createAction(
    '[Auth] Set Password Success'
);

export const setPasswordFailure = createAction(
    '[Auth] Set Password Failure',
    props<{ error: string }>()
);



