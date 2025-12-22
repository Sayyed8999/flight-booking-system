import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import * as AuthActions from '../../../features/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../../features/auth/store/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss'
})
export class PageLayout {
  public isLoggedIn$

  @ViewChild(MatSidenav) private sidenav!: MatSidenav;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsAuthenticated);
  }

  public toggleSidenav(): void {
    this.sidenav.toggle();
  }

  public handleLogoutClick(value: boolean): void {
    if (!value) {
      this.store.dispatch(
        AuthActions.logout()
      );

      this.closeSidenav();
    }
  }

  public closeSidenav(): void {
    this.sidenav.close();
  }
}

