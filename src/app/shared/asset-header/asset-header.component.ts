import { CommonXHRService } from './../../core/common-xhr.service';
import { UserStateService } from './../../core/user-state.service';
import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap';

declare const swal: any;
@Component({
  selector: 'asset-header',
  templateUrl: './asset-header.component.html',
  styleUrls: ['./asset-header.component.scss']
})
export class AssetHeaderComponent implements OnInit {
  modifyPwdModalRef: BsModalRef;
  modalConfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  username = '';
  newPassword = '';
  oldPassword = '';

  constructor(
    private loginService: LoginService,
    private userStateService: UserStateService,
    private commonXHRService: CommonXHRService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.username = this.userStateService.getUser().username;
  }

  public toggled(open: boolean): void {
    // console.log('Dropdown is now: ', open);
  }

  logout() {
    this.loginService.logout();
  }

  showModifyPwdModal(modal) {
    this.newPassword = '';
    this.oldPassword = '';
    this.modifyPwdModalRef = this.modalService.show(modal);
  }

  modifyPassword(modal) {
    if (!this.oldPassword) {
      swal({ text: '请输入原密码', button: '确认', });
      return false;
    } else if (!this.newPassword) {
      swal({ text: '请输入新密码', button: '确认', });
      return false;
    }

    this.commonXHRService.modifyPassword({
      newPassword: this.newPassword,
      oldPassword: this.oldPassword,
    }).then(data => {
      if (data.status === 0) {
        swal({ title: '修改成功', text: data.msg, icon: 'success', button: '确认', });
        modal.hide();
      } else {
        swal({ title: '修改失败', text: data.msg, icon: 'error', button: '确认', });
      }
    })
  }
}
