import { createAction, props } from '@ngrx/store';
import { AuthUser } from './auth.state';

export enum AuthActionTypes {
    INIT_AUTH = '[Auth] Init Auth',

    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',

    LOGOUT = '[Auth] Logout',
    SET_INITIAL_STATE = '[Auth] Set initial State',

    UPDATE_PROFILE = '[Auth] Update Profile',
    UPDATE_PROFILE_SUCCESS = '[Auth] Update Profile Success',
    UPDATE_PROFILE_FAILURE = '[Auth] Update Profile Failure',

    REGISTER = '[Auth] Register',
    REGISTER_SUCCESS = '[Auth] Register Success',
    REGISTER_FAILURE = '[Auth] Register Failure',

    VERIFY_SIGNUP_OTP = '[Auth] Verify Signup OTP',
    VERIFY_SIGNUP_OTP_SUCCESS = '[Auth] Verify Signup OTP Success',
    VERIFY_SIGNUP_OTP_FAILURE = '[Auth] Verify Signup OTP Failure',

    SET_PASSWORD = '[Auth] Set Password',
    SET_PASSWORD_SUCCESS = '[Auth] Set Password Success',
    SET_PASSWORD_FAILURE = '[Auth] Set Password Failure',

    RESEND_SIGNUP_OTP = '[Auth] Resend Signup OTP',
    RESEND_SIGNUP_OTP_SUCCESS = '[Auth] Resend Signup OTP Success',
    RESEND_SIGNUP_OTP_FAILURE = '[Auth] Resend Signup OTP Failure',
    OPEN_SIGN_UP_FLOW = '[Auth UI] Open Signup Flow'
}


export const initAuth = createAction(AuthActionTypes.INIT_AUTH);

export const login = createAction(
    AuthActionTypes.LOGIN,
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    AuthActionTypes.LOGIN_SUCCESS,
    props<{ user: AuthUser; token: string }>()
);

export const loginFailure = createAction(
    AuthActionTypes.LOGIN_FAILURE,
    props<{ error: string; code?: 'PASSWORD_NOT_SET' | 'INVALID_CREDENTIALS' }>()
);

export const logout = createAction(AuthActionTypes.LOGOUT);
export const setInitialState = createAction(AuthActionTypes.SET_INITIAL_STATE);


export const updateProfile = createAction(
    AuthActionTypes.UPDATE_PROFILE,
    props<{ name: string }>()
);

export const updateProfileSuccess = createAction(
    AuthActionTypes.UPDATE_PROFILE_SUCCESS,
    props<{ user: AuthUser }>()
);

export const updateProfileFailure = createAction(
    AuthActionTypes.UPDATE_PROFILE_FAILURE,
    props<{ error: string }>()
);

export const register = createAction(
    AuthActionTypes.REGISTER,
    props<{ name: string; email: string }>()
);

export const registerSuccess = createAction(
    AuthActionTypes.REGISTER_SUCCESS,
    props<{ email: string }>()
);


export const registerFailure = createAction(
    AuthActionTypes.REGISTER_FAILURE,
    props<{ error: string }>()
);

export const verifySignupOtp = createAction(
    AuthActionTypes.VERIFY_SIGNUP_OTP,
    props<{ email: string; otp: string }>()
);

export const verifySignupOtpSuccess = createAction(
    AuthActionTypes.VERIFY_SIGNUP_OTP_SUCCESS
);


export const verifySignupOtpFailure = createAction(
    AuthActionTypes.VERIFY_SIGNUP_OTP_FAILURE,
    props<{ error: string }>()
);

export const setPassword = createAction(
    AuthActionTypes.SET_PASSWORD,
    props<{
        email: string;
        password: string;
        confirmPassword: string;
    }>()
);

export const setPasswordSuccess = createAction(
    AuthActionTypes.SET_PASSWORD_SUCCESS
);

export const setPasswordFailure = createAction(
    AuthActionTypes.SET_PASSWORD_FAILURE,
    props<{ error: string }>()
);

export const resendSignupOtp = createAction(
    AuthActionTypes.RESEND_SIGNUP_OTP,
    props<{ email: string }>()
);

export const resendSignupOtpSuccess = createAction(
    AuthActionTypes.RESEND_SIGNUP_OTP_SUCCESS
);

export const resendSignupOtpFailure = createAction(
    AuthActionTypes.RESEND_SIGNUP_OTP_FAILURE,
    props<{ error: string }>()
);

export const openSignupFlow = createAction(
    AuthActionTypes.OPEN_SIGN_UP_FLOW,
    props<{ email: string }>()
);





