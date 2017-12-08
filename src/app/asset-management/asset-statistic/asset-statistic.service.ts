import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';
@Injectable()
export class AssetStatisticService {

  constructor(private httpService: HttpService) { }

  /**
   * 获取下拉列表
   * 获取下拉列表
   */
  // getListAssetCategory(params: any): any {
  //   return this.httpService
  //     .getRequest(API.listAssetCategory, params)
  // }
  // getListOrganizationCurrentUser(params: any): any {
  //   return this.httpService
  //     .getRequest(API.listOrganizationCurrentUser, params)
  // }
  // getListAssetStatusType(params: any): any {
  //   return this.httpService
  //     .getRequest(API.listAssetStatusType, params)
  // }
  getTreeNodde(params: any): any {
      return this.httpService
        .getRequest(API.listOrganizationCurrentUser, params)
    }
  getCountAssetNetValue(params: any): any {
    return this.httpService
      .getRequest(API.countAssetNetValue, params)
  }
}
