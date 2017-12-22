import { CommonXHRService } from './../../core/common-xhr.service';
import { UserStateService } from './../../core/user-state.service';
import { LoginService } from './../../login/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap';
import { SystemMessage } from 'app/model/SystemMessage.model';

declare const swal: any;
@Component({
  selector: 'asset-header',
  templateUrl: './asset-header.component.html',
  styleUrls: ['./asset-header.component.scss']
})
export class AssetHeaderComponent implements OnInit, OnDestroy {
  modifyPwdModalRef: BsModalRef;
  messageDetailModalRef: BsModalRef;
  modalConfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  username = '';
  newPassword = '';
  oldPassword = '';

  messageVisiable = false;
  _showMessageTask: any;
  _getMessageTask: any;
  messages: SystemMessage[] = [];
  messageDetail: SystemMessage;

  constructor(
    private loginService: LoginService,
    private userStateService: UserStateService,
    private commonXHRService: CommonXHRService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.username = this.userStateService.getUser().username;
    this.getMessageTask();
  }

  ngOnDestroy(): void {
    clearInterval(this._getMessageTask);
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

  showMessageDetailModal(message: SystemMessage, modal) {
    this.messageDetail = message;
    console.log(this.messageDetail);
    this.messageDetailModalRef = this.modalService.show(modal, Object.assign({}, this.modalConfig, { class: 'modal-lg modal-primary' }));
    this.readMessage(message);
  }

  showMessageTask() {
    if (this.messages.length > 0) {
      this._showMessageTask = setInterval(() => {
        this.messageVisiable = !this.messageVisiable;
        // console.log(this.messageVisiable);
      }, 500);
    }
  }

  getMessageTask() {
    this.getMessages();
    this._getMessageTask = setInterval(() => {
      this.getMessages();
    }, 1000 * 60);
  }

  getMessages() {
    this.commonXHRService.getUnreadMessage().then(data => {
      if (data.status === 0) {
        this.messages = data.data.map((value, index, arr) => {
          const detail = JSON.parse(JSON.parse(value.detail));
          if (detail instanceof Array) {
            value.detail = detail;
          } else {
            value.detail = [{}, detail];
          }
          return value;
        });
        console.log(this.messages);
        clearInterval(this._showMessageTask);
        this.showMessageTask();
      } else {

      }
    });
  }

  readMessage(message?: SystemMessage) {
    if (this.messages.length === 0) {
      return false;
    }

    this.commonXHRService.readMessage({
      sysMessageId: message ? message.sysMessageId : ''
    }).then(data => {
      if (data.status === 0) {
        if (message) {
          const index = this.messages.indexOf(message);
          this.messages.splice(index, 1);
          if (this.messages.length === 0) {
            clearInterval(this._showMessageTask);
            this.messageVisiable = false;
          }
        } else {
          this.messages = [];
          clearInterval(this._showMessageTask);
          this.messageVisiable = false;
        }
      } else {

      }
    });
  }
}
