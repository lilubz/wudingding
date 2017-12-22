import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAutocompleteComponent } from './employee-autocomplete.component';

describe('EmployeeAutocompleteComponent', () => {
  let component: EmployeeAutocompleteComponent;
  let fixture: ComponentFixture<EmployeeAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
