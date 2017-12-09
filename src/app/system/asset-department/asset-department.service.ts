import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';
@Injectable()
export class AssetDepartmentService {

  constructor(private httpService: HttpService) { }

  /**
   * 添加部门
   */
  AddDepartment(params: any): any {
    return this.httpService
      .formPostRequest(API.addDepartment, params)
  }
  /**
     * 删除部门
     */
  DeleteDepartment(params: any): any {
    return this.httpService
      .delete(API.deleteDepartment, params)
  }
  /**
   * 编辑部门
   */
  UpdateDepartment(params: any): any {
    return this.httpService
      .formPostRequest(API.updateDepartment, params)
  }
}
