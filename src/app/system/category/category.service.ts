import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';

@Injectable()
export class CategoryService {
  API = API;
  constructor(private httpService: HttpService) { }

  listAssetCategory(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listAssetCategory, params);
  }
  addCategory(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(this.API.addCategory, params);
  }
  deleteCategory(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.deleteCategory, params);
  }
  updateCategory(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(this.API.updateCategory, params);
  }
}
