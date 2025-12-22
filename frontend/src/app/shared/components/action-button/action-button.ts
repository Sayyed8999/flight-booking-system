import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './action-button.html',
  styleUrl: './action-button.scss'
})
export class ActionButton {
  @Input() loading: boolean | null = false;
  @Input() mainText = 'Submit';
  @Input() loadingText = 'Loading...';
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() panelClass = '';

  @Output() clicked = new EventEmitter<void>();

  public onClick(): void {
    if (this.loading || this.disabled) return;
    this.clicked.emit();
  }
}
