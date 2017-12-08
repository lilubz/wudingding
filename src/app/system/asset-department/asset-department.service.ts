import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';
@Injectable()
export class AssetDepartmentService {

  constructor(private httpService: HttpService) { }

  /**
   * 获取节点
   * @param getTreeNodde
   */
  // getTreeNodde(params: any): any {
  //   return this.httpService
  //     .getRequest(API.listOrganizationCurrentUser, params)
  // }
  getCountAssetNetValue(params: any): any {
    return this.httpService
      .getRequest(API.countAssetNetValue, params)
  }
}
