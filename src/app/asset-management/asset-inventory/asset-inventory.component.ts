import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { AssetInventoryService } from './asset-inventory.service';
declare const swal: any;
@Component({
  selector: 'asset-inventory',
  templateUrl: './asset-inventory.component.html',
  styleUrls: ['./asset-inventory.component.scss'],
  providers: [AssetInventoryService]
})
export class AssetInventoryComponent implements OnInit {
  modalRef: BsModalRef;
  detail = {
    assetId: '',
    assetSerialNumber: '',
    organizationName: '',
    assetCategoryName: '',
    employeeName: '',
    assetStatusTypeName: '',
    assetName: '',
    brandSpecification: '',
    storageLocation: '',
    purchaseTime: '',
    purchaseAmount: '',
  };
  tabel = {
    total: 20,
    pageNumber: 1,
    pageSize: 1,
    list: []
  }
  btns = {
    start: false,
    end: false
  }
  status = ''; // 绑定的下拉框数据，包含已经盘点（1）和未盘点（0）两个状态。
  constructor(private modalService: BsModalService, private assetInventoryService: AssetInventoryService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  ngOnInit() {
    this.getCurrentStatus();
  }

  onQuery(template, params) {
    this.getDetailInfo(template, {
      searchType: 'assetSerialNumber',
      keyWord: params
    })
  }
  onSelectedChange() {
    if (this.status === '') {
      this.tabel.list = [];
      this.tabel.total = 0;
      this.tabel.pageNumber = 1;
      return;
    } else {
      const params = {
        status: this.status,
        pageNumber: 1,
        pageSize: this.tabel.pageSize
      }
      this.getTableList(params);
    }
  }
  onPageChange(event) {
    this.getTableList({
      status: this.status,
      pageNumber: event.page,
      pageSize: this.tabel.pageSize
    });
    console.log(
      {
        status: this.status,
        pageNumber: this.tabel.pageNumber,
        pageSize: this.tabel.pageSize
      }
    );
    console.log(event);
  }
  sendInventory(template) {
    this.updateAssetInfo({
      assetSerialNumber: this.detail.assetSerialNumber
    });
    this.modalRef.hide();
  }
  startInventory() {
    swal({
      title: '请确认',
      text: '盘点工作即将开启',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((confirm) => {
        if (confirm) {
          this.sendStart();
        }
      });
  }
  endInventory() {
    swal({
      title: '请确认',
      text: '请检查是否存在未盘点的资产',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((confirm) => {
        if (confirm) {
          this.sendEnd();
        }
      });
  }

  sendStart(params?) {
    this.assetInventoryService.listInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.getCurrentStatus();
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        console.log(error);
        swal('出错了,错误代码：' + error.status , {
          icon: 'error',
        });
      });
  }

  getDetailInfo(template, params?) {
    this.assetInventoryService.getAssetInfo(params)
      .then(data => {
        if (data.status === 0) {
          this.modalRef = this.modalService.show(template);
          this.detail = data.data;
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  getTableList(params?) {
    this.assetInventoryService.listInventoryAsset(params)
      .then(data => {
        if (data.status === 0) {
          this.tabel.list = data.data.list;
          this.tabel.total = data.data.total;
        } else {
          this.tabel.list = [];
          this.tabel.total = 0;
          this.tabel.pageNumber = 1;
          this.status = '';
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.tabel.list = [];
        this.tabel.total = 0;
        this.tabel.pageNumber = 1;
        this.status = '';
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  sendEnd(params?) {
    this.assetInventoryService.listEndInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.tabel.list = [];
          this.tabel.total = 0;
          this.tabel.pageNumber = 1;
          this.status = '';
          this.getCurrentStatus();
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  updateAssetInfo(params?) {
    this.assetInventoryService.updateAssetInfo(params)
      .then(data => {
        if (data.status === 0) {
          this.modalRef.hide();
          this.onSelectedChange();
          swal(data.msg, {
            icon: 'success',
          });
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  getCurrentStatus() {
    this.assetInventoryService.getCurrentStatus()
      .then(data => {
        if (data.status === 0) {
          this.btns = {
            start: true,
            end: false
          }
        } else if (data.status === 1) {
          this.btns = {
            start: false,
            end: true
          }
        } else {
          this.btns = {
            start: true,
            end: true
          }
        }
      }).catch(error => {
        this.btns = {
          start: true,
          end: true
        }
      });
  }
  test() {
    console.log(this);
  }
}
