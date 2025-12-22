import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../../features/auth/login-dialog/login-dialog';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() public isLoggedIn = false;

  @Output() public menuToggle = new EventEmitter<void>();
  @Output() public isAuthenticated = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog,) { }

  public handleLogin(): void {
    this.isAuthenticated.emit(true);

    this.dialog.open(LoginDialog, {
      width: '100%',
      maxWidth: '420px',
      autoFocus: false
    });

  }

  public handleLogout(): void {
    this.isAuthenticated.emit(false);
  }
}
