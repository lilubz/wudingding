import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDropdownComponent } from './organization-dropdown.component';

describe('OrganizationDropdownComponent', () => {
  let component: OrganizationDropdownComponent;
  let fixture: ComponentFixture<OrganizationDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
