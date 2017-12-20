import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

import { API } from 'app/core/api';
import { HttpService } from 'app/core/http.service';
import { UserStateService } from 'app/core/user-state.service';

declare const swal: any;
@Injectable()
export class AssetSearchService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(
    private httpService: HttpService,
    private userStateService: UserStateService,
    private router: Router
  ) { }

  /**
   * 根据各种限制条件（部门、资产类别、时间、责任人、资产状态等），查询符合条件的资产信息
   *  2017-12-06 15:13:37
   * @author hzb
   * @param params
   * @returns
   */
  listAssetBasic(params: any): Promise<any> {
    return this.httpService
      .getRequest(API.listAssetBasic, params);
  }

  /**
   * 编辑资产信息
   * 2017-12-06 15:13:19
   * @author hzb
   * @param params
   * @returns
   */
  updateAssetInfo(params: any) {
    return this.httpService
      .withCredentialsPostRequest(API.updateAssetInfo, params);
  }

  /**
   * 删除资产信息
   * 2017-12-06 20:01:24
   * @author hzb
   * @param params
   * @returns
   */
  deleteAssetInfo(params: any) {
    return this.httpService
      .delete(API.deleteAssetInfo, params);
  }

  /**
   * 根据资产编码 获取资产详细信息
   * 2017-12-08 14:10:18
   * @author hzb
   * @param params
   * @returns
   */
  getAssetDetailInfo(params: { assetSerialNumber: string }) {
    return this.httpService
      .getRequest(API.getAssetDetailInfo, params);
  }

  /**
   * 资产审核
   * 2017-12-08 15:00:54
   * @author hzb
   * @param params
   * @returns
   */
  checkAsset(params: { assetSerialNumber: string }) {
    return this.httpService
      .withCredentialsPostRequest(API.checkAsset, params);
  }

  /**
   * 根据主资产id获取套资产信息
   * 2017-12-08 15:12:02
   * @author hzb
   * @param params
   * @returns
   */
  listAssetInfoByMajorAsset(params: { assetSerialNumber: string }) {
    return this.httpService
      .getRequest(API.listAssetInfoByMajorAsset, params);
  }

  /**
   * 导出资产
   * 2017-12-18 09:09:21
   * @author hzb
   * @param params
   * @returns
   */
  exportAsset(params: any) {
    return this.httpService
      .getRequest(API.downloadAssetUrl, params);
  }

}
