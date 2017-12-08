import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';
@Injectable()
export class AssetInventoryService {
  API = API;
  constructor(private httpService: HttpService) { }
  listInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listInventoryTask, params);
  }
  getAssetInfo(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.getAssetInfo, params);
  }
  listEndInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listEndInventoryTask, params);
  }
  listInventoryAsset(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listInventoryAsset, params);
  }
  getCurrentStatus(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.boolIsInventoryAssetBegin, params);
  }
  updateAssetInfo(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(this.API.stockTaking, params);
  }
}
