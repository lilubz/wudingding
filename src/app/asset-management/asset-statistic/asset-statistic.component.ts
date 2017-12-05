import { Component, OnInit } from '@angular/core';
import { AssetStatisticService } from 'app/asset-management/asset-statistic/asset-statistic.service';
import { error } from '../../../../node_modules/_@types_selenium-webdriver@2.53.43@@types/selenium-webdriver';

declare const swal: any;
@Component({
  selector: 'asset-statistic',
  templateUrl: './asset-statistic.component.html',
  styleUrls: ['./asset-statistic.component.scss']
})
export class AssetStatisticComponent implements OnInit {
  assetStatisticLIst = [];

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
  constructor(private _service: AssetStatisticService) { }
  ngOnInit() {
    this.getAssetType();
    this.getListAssetStatusType();
    this.getListOrganizationCurrentUser();

  }
  getAssetType(params?) {
    this._service.getListAssetCategory(params).then(data => {
      if (data.status === 0) {
        this.Dropdown.assetType = data.data.unshift(this.Dropdown.default)
      } else {

      }
    })
  }
  getListOrganizationCurrentUser(params?) {
    this._service.getListOrganizationCurrentUser(params).then(data => {
      if (data.status === 0) {
        this.Dropdown.organizationList = data.data.unshift(this.Dropdown.default)
      } else {

      }
    })
  }
  getListAssetStatusType(params?) {
    this._service.getListAssetStatusType(params).then(data => {
      if (data.status === 0) {
        this.Dropdown.assetStatus = data.data.unshift(this.Dropdown.default)
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
    this._service.getAssetStatisticList(params).then(data => {
      if (data.status === 0) {
        swal('Title', 'Text', 'success')
      } else {
        swal('Title', 'Text', 'warning')
      }
    })
  }



}
