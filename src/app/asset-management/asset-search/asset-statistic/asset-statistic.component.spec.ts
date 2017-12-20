import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStatisticComponent } from './asset-statistic.component';

describe('AssetStatisticComponent', () => {
  let component: AssetStatisticComponent;
  let fixture: ComponentFixture<AssetStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
