import { Injectable } from '@angular/core';

import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';

@Injectable()
export class PermissionService {

  constructor(private httpService: HttpService) { }

  listRoles(params?: any): Promise<any> {
    return this.httpService
      .getRequest(API.listRoles, params);
  }
  listSysPermission(params?: any): Promise<any> {
    return this.httpService
      .getRequest(API.listSysPermission, params);
  }
  listAllPermissions(params?: any): Promise<any> {
    return this.httpService
      .getRequest(API.listAllPermissions, params);
  }
  savePermissons(params?: any): Promise<any> {
    return this.httpService
      .formPostRequest(API.savePermissons, params);
  }
}
