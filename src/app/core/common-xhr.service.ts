import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserStateService } from './../core/user-state.service';
import { API } from './../core/api';
import { HttpService } from './../core/http.service';

import { AssetCategory } from './../model/AssetCategory.model';
import { AssetStatusType } from './../model/AssetStatusType.model';
import { Organization } from './../model/Organization.model';
@Injectable()
export class CommonXHRService {

  constructor(private httpService: HttpService, private userStateService: UserStateService, private router: Router) { }

  /**
   * 获取资产状态取值的列表信息
   * 2017-12-05 14:18:15
   * @author hzb
   */
  listAssetStatusType(): Promise<
    {
      status: number,
      msg: string,
      data: AssetStatusType[]
    }
    > {
    return this.httpService.getRequest(API.listAssetStatusType, {});
  }

  /**
   * 获取资产类别列表
   * 2017-12-05 14:18:19
   * @author hzb
   */
  listAssetCategory(): Promise<
    {
      status: number,
      msg: string,
      data: AssetCategory[]
    }
    > {
    return this.httpService.getRequest(API.listAssetCategory, {});
  }

  /**
   * 获取当前登录用户所在组织的所有直接子组织的简单信息
   * 2017-12-05 14:18:23
   * @author hzb
   */
  listOrganizationCurrentUser(): Promise<
    {
      status: number,
      msg: string,
      data: Organization[]
    }
    > {
    return this.httpService.getRequest(API.listOrganizationCurrentUser, {});
  }

  /**
   * 修改密码
   * 2017-12-05 14:54:15
   * @author hzb
   * @param params
   * @returns
   */
  modifyPassword(params: {
    newPassword: string,
    oldPassword: string,
  }): Promise<
  {
    status: number,
    msg: string,
  }
  > {
    return this.httpService.withCredentialsPostRequest(API.modifyPassword, params);
  }

  /**
   * 获取当前登录用户权限下，模糊查询符合名称的员工简单信息
   *
   * @author hzb
   * @param params
   * @returns
   */
  listEmployeeSimpleCurrentUser(params: { employeeName: string }): Promise<
    {
      status: number,
      msg: string,
      data: {
        employeeNumber: string,
        employeeName: string,
      }[]
    }
    > {
    return this.httpService.getRequest(API.listEmployeeSimpleCurrentUser, params);
  }

  /**
   * 获取某个organizationId下面所有节点的简单信息，如果入参为空，organizationId为当前登录用户的
   * 2017-12-07 17:14:00
   * @author hzb
   * @param params
   * @returns
   */
  listOrganizationChildren(params: { organizationId: string }): Promise<any> {
    return this.httpService.getRequest(API.listOrganizationChildren, params);
  }

  /**
   * 获取当前用户的所有未读消息
   * 2017-12-21 14:18:40
   * @author hzb
   * @param
   * @returns
   */
  getUnreadMessage() {
    return this.httpService.getRequest(API.listSysMessages, {});
  }

  /**
   * 将消息标记为已读
   * 2017-12-21 14:19:22
   * @author hzb
   * @param params
   * @returns
   */
  readMessage(params: any) {
    return this.httpService.withCredentialsPostRequest(API.updateSysMessagesIsRead, params);
  }

  /**
   * 根据组织id获取角色
   * 2017-12-22 14:58:22
   * @author hzb
   * @param params
   * @returns
   */
  listRoles(params: { organizationId: string }) {
    return this.httpService.getRequest(API.listRoles, params);
  }

  /**
   * 新增用户
   * 2017-12-22 16:01:40
   * @author hzb
   * @param params
   * @returns
   */
  addUser(params: { username: string, password: string, roleId: number, employeeNumber: string }) {
    return this.httpService.withCredentialsPostRequest(API.addUser, params);
  }

  /**
   * 打印资产二维码
   * 2017-12-25 19:09:45
   * @author hzb
   * @param params
   * @returns
   */
  printQRcode(params: { assetSerialNumber: string, assetName: string }) {
    return this.httpService.withCredentialsPostRequest(API.printQRcode, params);
  }
}
