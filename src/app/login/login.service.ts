import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';

import { HttpService } from './../core/http.service';
import { UserStateService } from './../core/user-state.service';
import { API } from 'app/core/api';

declare const swal: any;
@Injectable()
export class LoginService {

  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8' });

  constructor(
    private httpService: HttpService,
    private userStateService: UserStateService,
    private router: Router
  ) { }

  /**
   *
   *
   * @author hzb
   * @param {{ username: string, password: string }} params
   * @returns {Promise<any>}
   */
  signIn(params: { username: string, password: string }): Promise<boolean> {
    return this.httpService
      .withCredentialsPostRequest(API.signIn, params)
      .then(data => {
        if (data.status === 0) {// 登录成功
          this.userStateService.setUser(data.data || undefined);
          this.router.navigate(['/asset-management']);
          return true;
        } else if (data.status === 4) {// 已经登录
          this.userStateService.setUser(data.data || undefined);
          swal({
            title: '您已登录',
            text: `当前登录用户 ${this.userStateService.getUser().username} ,如需登录其它账号请先退出再登录！`,
            icon: 'warning',
            button: '确认',
          });
          this.router.navigate(['/asset-management']);
          return true;
        } else {
          swal({
            title: '登录失败',
            text: data.msg,
            icon: 'error',
            button: '确认',
          });
          return false;
        }
      }).catch(error => {
        // console.log(error);
        // throw error;
        return false;
      });
  }

  // signUp(params: any): Promise<any> {
  //   return this.httpService
  //     .withCredentialsPostRequest(this.API.queryLog, params);
  // }

  logout(): Promise<any> {
    return this.httpService
      .getRequest(API.logout, null)
      .then(data => {
        this.userStateService.setUser(undefined);
        this.router.navigate(['/login']);
        if (data.status !== 0) {
          swal({
            title: '注销异常',
            text: data.msg,
            icon: 'error',
            button: '确认',
          });
          return false;
        } else {
          return true;
        }
      }).catch(error => {
        swal({
          title: '注销异常',
          text: error.statusText,
          icon: 'error',
          button: '确认',
        });
        this.userStateService.setUser(undefined);
        this.router.navigate(['/login']);
      });
  }
}
