import { Component, OnInit } from '@angular/core';

import { PermissionService } from './permission.service'
import { ActivatedRoute } from '@angular/router'
import { Dropdown } from '../../../../node_modules/_primeng@4.3.0@primeng/primeng';
declare const swal: any;
@Component({
  selector: 'asset-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  providers: [PermissionService]
})
export class PermissionComponent implements OnInit {
  dropdown = {
    options: [],
    value: null
  }
  permission = {
    all: [],
    obj: {}  // 存放已选择角色ID的权限，并和页面上的复选框双向绑定。
  }
  constructor(private _service: PermissionService, private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    if (JSON.stringify(this.routerInfo.queryParams['value']) !== '{}'
      && typeof (this.routerInfo.queryParams['value'].roleId) !== 'undefined') {
      this.dropdown.value = this.routerInfo.queryParams['value'].roleId;
      this.onDropdownChange();
    }
    this.getDropdownOptions();
  }

  onDropdownChange() {
    this.permission.all = [];
    this.getAllPermissionList(
      () => this.getNowPermissionList({
        roleId: this.dropdown.value
      })
    );
  }
  onSave() {
    const permissionList = []
    // tslint:disable-next-line:forin
    for (const key in this.permission.obj) {
      if (this.permission.obj[key] === true) {
        permissionList.push(Number(key));
      }
    }
    this.sendPermissionList({
      roleId: Number(this.dropdown.value),
      permissionId: permissionList
    });
  }
  getDropdownOptions(params?) {
    this._service.listRoles(params)
      .then(data => {
        if (data.status === 0) {
          this.dropdown.options = data.data.list.map(item => ({
            label: item.roleName,
            value: item.roleId
          }));
        } else {
          this.dropdown.options = [];
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.dropdown.options = [];
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
        throw error;
      });
  }
  getNowPermissionList(params?) {
    this._service.listSysPermission(params)
      .then(data => {
        if (data.status === 0) {
          for (let i = 0; i < data.data.length; i++) {
            this.permission.obj[data.data[i]] = true;
          }
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
        throw error;
      });
  }
  getAllPermissionList(callBack?) {
    this._service.listAllPermissions()
      .then(data => {
        if (data.status === 0) {
          this.permission.all = data.data;
          for (let i = 0; i < data.data.length; i++) {
            this.permission.obj[data.data[i].permissionId] = false;
          }
          if (typeof callBack === 'function') {
            callBack();
          }
        } else {
          this.permission.obj = {};
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.permission.obj = {};
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
        throw error;
      });
  }
  sendPermissionList(params?) {
    this._service.savePermissons(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          setTimeout(() => {
            this.onDropdownChange();
          }, 1000);
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
        throw error;
      });
  }
}
