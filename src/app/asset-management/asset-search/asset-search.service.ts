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
   *
   * @author hzb
   * @param params
   * @returns
   */
  listAssetBasic(params: any): Promise<any> {
    return this.httpService
      .getRequest(API.listAssetBasic, params);
  }
}
