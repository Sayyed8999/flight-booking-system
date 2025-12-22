import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from './login-dialog/login-dialog';

@Injectable({ providedIn: 'root' })
export class AuthModalService {
    private dialog = inject(MatDialog);

    openLogin(): void {
        this.dialog.open(LoginDialog, {
            width: '100%',
            maxWidth: '420px',
            autoFocus: false,
            disableClose: true
        });
    }
}
