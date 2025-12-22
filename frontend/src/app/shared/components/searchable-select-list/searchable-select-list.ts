import {
  Component,
  Input,
  Optional,
  Self,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectListItem } from '../../models/airport.model';

@Component({
  standalone: true,
  selector: 'app-searchable-select-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './searchable-select-list.html',
  styleUrl: './searchable-select-list.scss'
})
export class SearchableSelectList
  implements ControlValueAccessor, OnInit {

  @Input() label!: string;

  control = new FormControl<string | null>(null);
  @Input() data: SelectListItem[] = [];
  filteredData: SelectListItem[] = [];

  private onChange = (_: string | null) => { };
  public onTouched = () => { };

  constructor(@Optional() @Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.filteredData = this.data;

    this.control.valueChanges.subscribe(value => {
      this.filteredData = this.filterData(value);
      this.onChange(value);
    });
  }

  writeValue(value: string | null): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  displayFn(value: string | null): string {
    const data = this.data.find(a => a.value === value);
    return data
      ? `${data.label} (${data.value})`
      : '';
  }

  selectItem(data: SelectListItem) {
    this.control.setValue(data.value);
    this.onTouched();
  }

  private filterData(query: string | null): SelectListItem[] {
    if (!query) return this.data;

    const q = query.toLowerCase();

    return this.data.filter(a =>
      a.label.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.value.toLowerCase().includes(q)
    );
  }
}
