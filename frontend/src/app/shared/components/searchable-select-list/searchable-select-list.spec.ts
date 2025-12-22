import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableSelectList } from './searchable-select-list';

describe('SearchableSelectList', () => {
  let component: SearchableSelectList;
  let fixture: ComponentFixture<SearchableSelectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableSelectList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchableSelectList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
