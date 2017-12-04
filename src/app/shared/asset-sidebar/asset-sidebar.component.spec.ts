import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSidebarComponent } from './asset-sidebar.component';

describe('AssetSidebarComponent', () => {
  let component: AssetSidebarComponent;
  let fixture: ComponentFixture<AssetSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
