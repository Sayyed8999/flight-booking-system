import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly defaultDuration = 4000;

    constructor(private snackBar: MatSnackBar) { }

    public error(error: any, fallbackMessage = 'Something went wrong'): void {
        const message =
            error?.error?.message ||
            error?.message ||
            fallbackMessage;

        this.snackBar.open(message, 'Dismiss', {
            duration: this.defaultDuration,
            panelClass: ['error-snackbar']
        });
    }

    public success(message: string): void {
        this.snackBar.open(message, 'OK', {
            duration: this.defaultDuration,
            panelClass: ['success-snackbar']
        });
    }

    public info(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: this.defaultDuration
        });
    }
}
