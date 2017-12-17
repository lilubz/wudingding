import { TestBed, inject } from '@angular/core/testing';

import { AssetAddService } from './asset-add.service';

describe('AssetAddService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetAddService]
    });
  });

  it('should be created', inject([AssetAddService], (service: AssetAddService) => {
    expect(service).toBeTruthy();
  }));
});
