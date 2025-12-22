import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss'
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';

  disabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(): void { }
  registerOnChange(): void { }
  registerOnTouched(): void { }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get control() {
    if (!this.ngControl || !this.ngControl.control) {
      throw new Error(
        'app-form-input must be used with a formControlName or formControl'
      );
    }
    return this.ngControl?.control as FormControl;
  }

  get showError(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }
}

