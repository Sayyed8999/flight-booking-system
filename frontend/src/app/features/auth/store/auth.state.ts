export const AUTH_FEATURE_KEY = 'auth';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
};
