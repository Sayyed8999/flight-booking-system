export enum SignupStep {
    REGISTER = 'register',
    VERIFY_OTP = 'verify-otp',
    SET_PASSWORD = 'set-password'
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}

export enum AuthApiEndpoint {
    REGISTER = '/register',
    VERIFY_SIGNUP_OTP = '/verify-signup-otp',
    SET_PASSWORD = '/set-password',
    LOGIN = '/login'
}