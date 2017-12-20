import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { zh } from './../../../core/date-localization';
import { API } from './../../../core/api';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { MarkService } from './mark.service';
declare const swal: any;

@Component({
  selector: 'asset-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss'],
  providers: [MarkService]
})
export class MarkComponent implements OnInit {
  task = {
    id: 1,
  };
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

  status: any = ''; // 绑定的下拉框数据，包含已经盘点（1）和未盘点（0）两个状态。
  constructor(private modalService: BsModalService, private _service: MarkService, private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    this.task = this.routerInfo.queryParams['value'];
    this.onSearch();
  }

  onSearch() {
    this.table.list = [];
    this.table.total = 0;
    this.table.first = 0;
    const params = {
      status: this.status,
      pageNumber: 1,
      pageSize: this.table.pageSize,
      assetInventoryTaskId: this.task.id
    }
    this.getTableList(params);
  }

  onLookDetail(template, params, input?, submit?) {
    // 参数 input 和 submit 是两个Dom元素。是为了解决打开模态框后表单元素仍然拥有焦点，导致按enter键会打开多个模态框。
    input.blur();
    submit.blur();
    this.getDetailInfo(template, {
      searchType: 'assetSerialNumber',
      keyWord: params,
      assetInventoryTaskId: this.task.id
    });
  }
  onExport() {
    this.getExportURL({
      status: this.status,
      assetInventoryTaskId: this.task.id
    });
  }

  onPageChange(event) {
    this.table.pageSize = event.rows;
    this.table.first = event.first;
    this.getTableList({
      status: this.status,
      pageNumber: event.page + 1,
      pageSize: event.rows,
      assetInventoryTaskId: this.task.id
    });
  }

  sendInventory() {
    this.updateAssetInfo({
      assetSerialNumber: this.detail.assetSerialNumber,
      assetInventoryTaskId: this.task.id
    });
  }



  getDetailInfo(template, params?) {
    this._service.getAssetInfo(params)
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
    this._service.listInventoryAsset(params)
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

  updateAssetInfo(params?) {
    this._service.updateAssetInfo(params)
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
  getExportURL(params) {
    this._service.exportInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          window.location.href = API.url + data.data;
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
}
