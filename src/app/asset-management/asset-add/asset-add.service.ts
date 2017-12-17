import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/http.service';
import { API } from 'app/core/api';

@Injectable()
export class AssetAddService {

  constructor(private httpService: HttpService) { }

  /**
   * 新增资产信息
   * 2017-12-06 15:13:23
   * @author hzb
   * @param params
   * @returns
   */
  addAssetInfo(params: any) {
    return this.httpService
      .withCredentialsPostRequest(API.addAssetInfo, params);
  }
}
