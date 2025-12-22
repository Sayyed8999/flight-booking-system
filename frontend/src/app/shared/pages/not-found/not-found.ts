import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-not-found',
    imports: [CommonModule, MatButtonModule],
    template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>

      <button mat-flat-button color="primary" (click)="goHome()">
        Go to Flights
      </button>
    </div>
  `,
    styles: [`
    .not-found {
      height: 70vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  `]
})
export class NotFound {
    constructor(private router: Router) { }

    goHome() {
        this.router.navigate(['/flights']);
    }
}
