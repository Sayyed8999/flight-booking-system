import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectList } from './select-list';

describe('SelectList', () => {
  let component: SelectList;
  let fixture: ComponentFixture<SelectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
