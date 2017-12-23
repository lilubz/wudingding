import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';


@Injectable()
export class SystemRoleService {
    constructor(private httpService: HttpService) { }
        /**
   * 添加部门
   */
  AddSystemRole(params: any): any {
    return this.httpService
      .formPostRequest(API.addSystemRole, params)
  }
  /**
     * 删除部门
     */
    DeleteSystemRole(params: any): any {
    return this.httpService
      .delete(API.deleteSystemRole, params)
  }
  /**
   * 编辑部门
   */
  EditSystemRole(params: any): any {
    return this.httpService
      .formPostRequest(API.editSystemRole, params)
  }
}
