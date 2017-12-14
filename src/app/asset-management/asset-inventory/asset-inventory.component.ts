import { Component, OnInit, TemplateRef } from '@angular/core';
import { zh } from './../../core/date-localization';

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
  table = {
    total: 0,
    pageSize: 5,
    first: 0,
    options: [5, 10, 20, 40],
    list: []
  }
  btns = {
    start: false,
    end: false
  }
  beginForm = {
    beginTime: '',
    endTime: '',
    department: ''
  }
  status: any = ''; // 绑定的下拉框数据，包含已经盘点（1）和未盘点（0）两个状态。
  constructor(private modalService: BsModalService, private assetInventoryService: AssetInventoryService) { }

  ngOnInit() {
    this.getCurrentStatus();
  }

  onSearch() {
    this.table.list = [];
    this.table.total = 0;
    this.table.first = 0;
    const params = {
      status: this.status,
      pageNumber: 1,
      pageSize: this.table.pageSize
    }
    this.getTableList(params);
  }

  onLookDetail(template, params, input, submit) {
    // 参数 input 和 submit 是两个Dom元素。是为了解决打开模态框后表单元素仍然拥有焦点，导致按enter键会打开多个模态框。
    input.blur();
    submit.blur();
    this.getDetailInfo(template, {
      searchType: 'assetSerialNumber',
      keyWord: params
    });
  }

  onOpenBeginModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  onPageChange(event) {
    this.table.pageSize = event.rows;
    this.table.first = event.first;
    this.getTableList({
      status: this.status,
      pageNumber: event.page + 1,
      pageSize: event.rows
    });
  }

  sendInventory() {
    this.updateAssetInfo({
      assetSerialNumber: this.detail.assetSerialNumber
    });
  }

  startInventory(template) {
    this.modalRef = this.modalService.show(template);
    // swal({
    //   title: '请确认',
    //   text: '盘点工作即将开启',
    //   icon: 'warning',
    //   buttons: true,
    //   dangerMode: true,
    // })
    //   .then((confirm) => {
    //     if (confirm) {
    //       this.sendStart();
    //     }
    //   });
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
          this.table.total = data.data.total;
        } else {
          this.table.list = [];
          this.table.total = 0;
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.table.list = [];
        this.table.total = 0;
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
          this.onSearch();
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
          this.status = 0;
          this.onSearch();
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
