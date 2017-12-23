import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, OnDestroy, TemplateRef, } from '@angular/core';

import { SystemRoleService, } from './system-role.service';
import { UserStateService } from 'app/core/user-state.service';
import { CommonXHRService } from 'app/core/common-xhr.service';
import { EditModel } from 'app/system/system-role/edit.model';
import { AddModel } from 'app/system/system-role/add.model';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/primeng';
declare const swal: any;

@Component({
  selector: 'asset-system-role',
  templateUrl: './system-role.component.html',
  styleUrls: ['./system-role.component.scss']
})
export class SystemRoleComponent implements OnInit {
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  editForm: EditModel = new EditModel();
  addForm: AddModel = new AddModel();
  searchParams: {
    organizationId: string,
  } = {
      organizationId: '',
    };

  roleList: any[] = [];
  List: any[] = [];

  pageSize = 10;
  pageNumber = 1;
  total = 0;
  pageFirst = 0;

  selectedSearchOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  selectedEditOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  selectedEditOrgId;
  selectedAddOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };


  constructor(private _service: SystemRoleService,
    private modalService: BsModalService,
    private commonXHRService: CommonXHRService) { }

  ngOnInit() {
    this.getList();
  }
  showEditModal(role, modal) {

    this.editForm.organizationId = role.organizationId;
    this.editForm.roleName = role.roleName;
    this.editForm.description = role.description;
    this.editForm.roleId = role.roleId;
    this.editModalRef = this.modalService.show(
      modal,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }
  showAddModal(modal) {
    this.addModalRef = this.modalService.show(
      modal,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }
  pageChanged(event) {
    // console.log(event);
    this.pageNumber = event.page + 1;
    this.pageSize = event.rows;
    this.pageFirst = event.first;
    this.roleList = this.List.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber);
  }
  // copyData() {
  //   for (let i = 0; i < 50; i++) {
  //     this.List.push({
  //       roleId: '110' + i,
  //       organizationName: '12' + i,
  //       roleName: 'hello' + i,
  //       description: '我是一只小小鸟' + i
  //     });
  //   }
  //   this.roleList = this.List.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber);
  //   // this.roleList = items;
  //   console.log(this.roleList);
  //   this.total = this.List.length;
  // }

  getList() {
    const params = {
      organizationId: this.selectedSearchOrg.data || '',
    }
    this.commonXHRService.listRoles(params).then(data => {
      if (data.status === 0) {
        this.List = data.data.list;
        this.roleList = this.List.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber);
        this.total = data.data.total;
      } else {
        this.List = [];
        this.roleList = this.List.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber);
        this.total = 0;
        swal({ title: '获取角色信息失败', text: data.msg, icon: 'warning', button: '确认', });
      }
    }).catch(error => {
      this.roleList = [];
      swal({ title: '响应异常', text: error.status, icon: 'error', button: '确认', });
    })
  }
  editSystemRole() {
    console.log(this.selectedEditOrg);
    
    swal({
      title: '确认修改"' + this.editForm.roleName + '"该角色名吗？',
      text: '',
      icon: 'warning',
      buttons: ['取消', '确定'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const params = {
          roleId: this.editForm.roleId,
          organizationId: this.selectedEditOrg.data,
          name: this.editForm.roleName,
          description: this.editForm.description,
        }
        this._service.EditSystemRole(params).then(data => {
          if (data.status === 0) {
            swal({ title: '修改成功', text: '', icon: 'success', button: '确认', });
            this.editModalRef.hide();
            this.editModalRef = null;
            this.searchParams.organizationId = '';
            this.getList();
          } else {
            swal({ title: '修改失败', text: data.msg, icon: 'warning', button: '确认', });
          }
        }).catch(error => {
          swal({ title: '响应异常', text: error.status, icon: 'error', button: '确认', });
          this.editModalRef.hide();
          this.editModalRef = null;
        })
      } else { }
    })
  }
  addSystemRole() {
    swal({
      title: '确认添加"' + this.addForm.roleName + '"该角色吗？',
      text: '',
      icon: 'warning',
      buttons: ['取消', '确定'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const params = {
          organizationId: this.selectedAddOrg.data,
          name: this.addForm.roleName,
          description: this.addForm.description
        };
        this._service.AddSystemRole(params).then(data => {
          console.log(data.msg)
          if (data.status === 0) {
            swal({ title: '添加成功', text: '', icon: 'success', button: '确认', });
            this.addModalRef.hide();
            this.addModalRef = null;
            this.searchParams.organizationId = '';
            this.getList();
          } else {
            swal({ title: '添加失败', text: data.msg, icon: 'warning', button: '确认', });
          }

        }).catch(error => {
          this.addModalRef.hide();
          this.addModalRef = null;
          swal({ title: '响应异常', text: error.status, icon: 'error', button: '确认', });
        })
      } else { }
    })
  }



  deleteSystemRole(role) {
    swal({
      title: '确认删除"' + role.roleName + '"该角色吗？',
      text: '',
      icon: 'warning',
      buttons: ['取消', '确定'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._service.DeleteSystemRole({ roleId: role.roleId }).then(data => {
          if (data.status === 0) {
            swal({ title: '删除成功', text: '', icon: 'success', button: '确认', });
            this.getList();
          } else {
            swal({ title: '删除失败', text: data.msg, icon: 'warning', button: '确认', });
          }

        }).catch(error => {
          swal({ title: '响应异常', text: error.status, icon: 'error', button: '确认', });
        })
      } else { }
    })
  }
}
