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
    assetId: 1,
    assetSerialNumber: 'TEST101',
    organizationName: '永炜集团',
    assetCategoryName: '笔记本电脑',
    employeeName: '测试张三',
    assetStatusTypeName: '在用',
    assetName: '测试电脑',
    brandSpecification: '台',
    storageLocation: '28楼',
    purchaseTime: 1512057600000,
    purchaseAmount: 1200,
  };
  tabel = {
    total: 20,
    pageNumber: 1,
    pageSize: 10,
    list: []
  }
  status = ''; // 绑定的下拉框数据，包含已经盘点（1）和未盘点（0）两个状态。
  workingPosition = 2; // 控制开始盘点和结束盘点这两个按纽的显示与隐藏。为2两个都显示，为1只显示结束盘点，为0只显示开始盘点。
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
        pageNumber: this.tabel.pageNumber,
        pageSize: this.tabel.pageSize
      }
      this.getTableList(params);
    }
  }
  onPageChange(event) {
    this.getTableList({
      status: this.status,
      pageNumber: this.tabel.pageNumber,
      pageSize: this.tabel.pageSize
    });
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
          this.tabel.pageNumber = data.data.pages;
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
          this.workingPosition = 0;
        } else if (data.status === 1) {
          this.workingPosition = 1;
        } else {
          this.workingPosition = 2;
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.workingPosition = 2;
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }
  test() {
    console.log(this);
  }
}
