import { TestBed, inject } from '@angular/core/testing';

import { AssetDetailService } from './asset-detail.service';

describe('AssetDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetDetailService]
    });
  });

  it('should be created', inject([AssetDetailService], (service: AssetDetailService) => {
    expect(service).toBeTruthy();
  }));
});
