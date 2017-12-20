import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API } from './../../../core/api';
import { HttpService } from './../../../core/http.service';
@Injectable()
export class TaskService {
  API = API;
  constructor(private httpService: HttpService, private http: Http) { }

  listTask(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listInventoryTask, params);
  }
  deleteInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .delete(this.API.deleteInventoryTask, params);
  }
  updateInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(this.API.updateInventoryTask, params);
  }
  listEndInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .getRequest(this.API.listEndInventoryTask, params);
  }
  addInventoryTask(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(this.API.addInventoryTask, params);
  }
}
