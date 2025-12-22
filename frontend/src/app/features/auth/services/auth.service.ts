import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApiEndpoint, AuthUser, LoginResponse } from '../models/auth.types';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = `${environment.apiBaseUrl}/api/auth`;

    constructor(private http: HttpClient) { }

    public register(payload: { name: string; email: string }): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}${AuthApiEndpoint.REGISTER}`, payload);
    }

    public verifySignupOtp(payload: { email: string; otp: string }): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}${AuthApiEndpoint.VERIFY_SIGNUP_OTP}`, payload);
    }

    public setPassword(payload: {
        email: string;
        password: string;
        confirmPassword: string;
    }): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}${AuthApiEndpoint.SET_PASSWORD}`, payload);
    }

    public login(payload: {
        email: string;
        password: string;
    }): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.baseUrl}${AuthApiEndpoint.LOGIN}`,
            payload
        );
    }

    public updateProfile(payload: { name: string }) {
        return this.http.patch<AuthUser>(
            `${environment.apiBaseUrl}${AuthApiEndpoint.USERS_ME}`,
            payload
        );
    }

    public resendSignupOtp(payload: { email: string }) {
        return this.http.post<void>(
            `${this.baseUrl}${AuthApiEndpoint.RESEND_SIGNUP_OTP}`,
            payload
        );
    }
}
