import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../../core/api';
import { HttpService } from './../../../core/http.service';
@Injectable()
export class MarkService {
  API = API;
  constructor(private httpService: HttpService) { }
  getAssetInfo(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.getAssetInfo, params);
  }
  listInventoryAsset(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listInventoryAsset, params);
  }
  updateAssetInfo(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(this.API.stockTaking, params);
  }
  exportInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.exportInventoryTask, params);
  }
}
