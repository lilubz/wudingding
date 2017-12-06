import { Component, OnInit } from '@angular/core';
import { AssetStatisticService } from 'app/asset-management/asset-statistic/asset-statistic.service';

declare const swal: any;
@Component({
  selector: 'asset-statistic',
  templateUrl: './asset-statistic.component.html',
  styleUrls: ['./asset-statistic.component.scss']
})
export class AssetStatisticComponent implements OnInit {
  assetStatisticList = [];

  Dropdown = {
    default: {
      value: '',
      label: '请选择'
    },
    assetType: [],
    organizationList: [],
    inventoryList: [
      {
        value: '',
        label: '请选择'
      },
      {
        value: '0',
        label: '未盘点'
      },
      {
        value: '1',
        label: '已盘点'
      },
    ],
    assetStatus: [],
  }

  searchParams = {
    assetCategoryId: '',
    organizationId: '',
    inventoryStatus: '',
    assetStatusTypeId: '',
    pageSize: 1,
    pageNumber: 10,
  }
  theads = [
    '资产id',
    '资产编号',
    '资产名称',
    '每月折损',
    '累计折损',
    '净值'
  ];
  constructor(private _service: AssetStatisticService) { }
  ngOnInit() {
    this.getAssetType();
    this.getListAssetStatusType();
    this.getListOrganizationCurrentUser();
    this.searchStatistic();

  }
  getAssetType(params?) {
    this._service.getListAssetCategory(params).then(data => {
      if (data.status === 0) {
        this.Dropdown.assetType = data.data.map(item => ({ label: item.categoryName, value: item.assetCategoryId }));
        this.Dropdown.assetType.unshift(this.Dropdown.default)
      } else {

      }
    })
  }
  getListOrganizationCurrentUser(params?) {
    this._service.getListOrganizationCurrentUser(params).then(data => {
      if (data.status === 0) {
        this.Dropdown.organizationList = data.data.map(item => ({ label: item.name, value: item.organizationId }));
        this.Dropdown.organizationList.unshift(this.Dropdown.default);
      } else {

      }
    })
  }
  getListAssetStatusType(params?) {
    this._service.getListAssetStatusType(params).then(data => {
      if (data.status === 0) {
        this.Dropdown.assetStatus = data.data.map(item => ({ label: item.assetStatusTypeName, value: item.assetStatusTypeId }));
        this.Dropdown.assetStatus.unshift(this.Dropdown.default)
      } else {

      }
    })
  }
  searchStatistic() {
    const params = {
      assetCategoryId: this.searchParams.assetCategoryId,
      organizationId: this.searchParams.organizationId,
      inventoryStatus: this.searchParams.inventoryStatus,
      assetStatusTypeId: this.searchParams.assetStatusTypeId,
      pageNumber: 1,
      pageSize: 10
    }
    this._service.getCountAssetNetValue(params)
      .then(data => {
        if (data.status === 0) {
          // const props = [];
          // for (let i = data.data.list.length; i >= 0; i--) {

          // }
          this.assetStatisticList = data.data.list;
          swal({
            title: '',
            text: '查询成功',
            icon: 'success',
            button: '确认',
          });
        } else {
          swal({
            title: '',
            text: '查询失败',
            icon: 'warning',
            button: '确认',
          });
        }
      }).catch(error => {
        swal({
          title: '响应异常',
          text: error,
          icon: 'error',
          button: '确认',
        });
      })
  }



}
