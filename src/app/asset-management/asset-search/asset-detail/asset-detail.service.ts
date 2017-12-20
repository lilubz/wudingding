
import { Injectable } from '@angular/core';
import { API } from 'app/core/api';
import { HttpService } from 'app/core/http.service';

@Injectable()
export class AssetDetailService {

  constructor(private httpService: HttpService) { }

  listAssetChangeHistory(params: any): Promise<any> {
    return this.httpService
      .getRequest(API.listAssetChangeHistory, params);
  }
}
