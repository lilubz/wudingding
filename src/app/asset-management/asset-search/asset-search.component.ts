import { AssetSearchService } from './asset-search.service';
import { Organization } from './../../model/Organization.model';
import { AssetStatusType } from './../../model/AssetStatusType.model';
import { CommonXHRService } from './../../core/common-xhr.service';
import { zhCn } from 'ngx-bootstrap/locale';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AssetCategory } from 'app/model/AssetCategory.model';
import * as moment from 'moment';
import { Asset } from 'app/asset-management/asset-search/asset.model';

declare const swal: any;
@Component({
  selector: 'asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.scss']
})
export class AssetSearchComponent implements OnInit {
  total = 20;
  pageNumber = 1;
  pageSize = 10;

  today = new Date();

  value: Asset[] = [];

  dateRange: Date[] = [moment().subtract(7, 'd').toDate(), new Date()];

  datePickerConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue',
    locale: 'zhCn',
    showWeekNumbers: false
  }

  categories: AssetCategory[];
  statusTypes: AssetStatusType[];
  organizations: Organization[];
  selectedCategory = '';
  selectedOrganization = '';
  selectedAssetStatus = '';
  selectedEmployee = '';
  showAddModal = false;

  constructor(
    private commonXHRService: CommonXHRService,
    private assetSearchService: AssetSearchService,
  ) { }

  ngOnInit() {
    this.commonXHRService.listAssetCategory().then(data => {
      if (data.status === 0) {
        this.categories = data.data;
      } else {
        swal({
          text: data.msg,
          icon: 'warning',
          button: '确认',
        })
      }
    });
    this.commonXHRService.listAssetStatusType().then(data => {
      if (data.status === 0) {
        this.statusTypes = data.data;
        this.selectedAssetStatus = this.statusTypes[0].assetStatusTypeName;
      } else {
        swal({
          text: data.msg,
          icon: 'warning',
          button: '确认',
        })
      }
    });
    this.commonXHRService.listOrganizationCurrentUser().then(data => {
      if (data.status === 0) {
        this.organizations = data.data;
      } else {
        swal({
          text: data.msg,
          icon: 'warning',
          button: '确认',
        })
      }
    })
  }

  search() {
    if (this.checkParams()) {
      this.assetSearchService.listAssetBasic({
        organizationId: this.selectedOrganization || 1,
        assetCategoryId: this.selectedCategory,
        useStatus: this.selectedAssetStatus,
        startTimeString: moment(this.dateRange[0]).format('YYYY-MM-DD'),
        endTimeString: moment(this.dateRange[1]).format('YYYY-MM-DD'),
        personInCharge: this.selectedEmployee,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }).then(data => {
        if (data.status === 0) {
          this.value = data.data.list;
          this.total = data.data.total;
        } else {
          swal({ text: data.msg, icon: 'warning', button: '确认', });
        }
      });
    }
  }

  searchEmployee() {
    this.commonXHRService.listEmployeeSimpleCurrentUser({
      employeeName: this.selectedEmployee
    }).then(data => {

    });
  }

  checkParams() {
    if (!this.dateRange || this.dateRange.length < 2) {
      swal({ text: '请选择录入时间段', icon: 'warning', button: '确认', });
      return false;
    }
    return true;
  }

  pageChanged(event) {
    this.pageNumber = event.page;
    this.search();
    console.log(event);
  }
  sizeChanged(event) {
    this.pageSize = event;
    this.pageNumber = 1;
    this.search();
    console.log(event);
  }
}
