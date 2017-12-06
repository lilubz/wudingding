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
  total= 200;
  pageNumber= 1;
  pageSize= 5;
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
  table = {
    total: 200,
    pageNumber: 1,
    pageSize: 5,
    list: []
  }
  btns = {
    start: false,
    end: false
  }
  status = ''; // 绑定的下拉框数据，包含已经盘点（1）和未盘点（0）两个状态。
  constructor(private modalService: BsModalService, private assetInventoryService: AssetInventoryService) { }

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
      this.table.list = [];
      this.table.total = 0;
      this.table.pageNumber = 1;
      return;
    } else {
      this.pageNumber = 1;
      const params = {
        status: this.status,
        pageNumber: this.pageNumber,
        pageSize: this.table.pageSize
      }
      this.getTableList(params);
    }
  }

  onPageChange(event) {
    console.log(event);
    this.pageNumber = event.page;
    this.pageSize = event.itemsPerPage;
    this.getTableList({
      status: this.status,
      pageNumber: event.page,
      pageSize: event.itemsPerPage
    });
  }
  onPageSizeChange(event) {
    console.log(this.table);
    console.log(event);
    this.pageNumber = 1;
    // this.pageSize = event;
    // this.getTableList({
    //   status: this.status,
    //   pageNumber: 1,
    //   pageSize: event
    // });
  }
  sendInventory() {
    this.updateAssetInfo({
      assetSerialNumber: this.detail.assetSerialNumber
    });
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

  sendStart() {
    this.assetInventoryService.listInventoryTask()
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
          this.table.list = data.data.list;
          this.total = data.data.total;
        } else {
          this.table.list = [];
          this.total = 0;
          this.pageNumber = 1;
          this.status = '';
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.table.list = [];
        this.total = 0;
        this.pageNumber = 1;
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
          this.table.list = [];
          this.table.total = 0;
          this.table.pageNumber = 1;
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
}
