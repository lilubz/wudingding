import { Organization } from './../../model/Organization.model';
import { AssetStatusType } from './../../model/AssetStatusType.model';
import { CommonXHRService } from './../../core/common-xhr.service';
import { zhCn } from 'ngx-bootstrap/locale';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AssetCategory } from 'app/model/AssetCategory.model';

@Component({
  selector: 'asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.scss']
})
export class AssetSearchComponent implements OnInit {
  heads: string[] = [
    '标题1',
    '标题1',
    '标题1',
    '标题1',
  ];

  value: any[] = [
    {
      q: 'saf',
      w: 'saf',
      e: 'saf',
      r: 'saf',
    },
  ];

  dateRange: any;

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

  constructor(private commonXHRService: CommonXHRService) { }

  ngOnInit() {
    this.commonXHRService.listAssetCategory().then(data => {
      if (data.status === 0) {
        this.categories = data.data;
      } else {

      }
    });
    this.commonXHRService.listAssetStatusType().then(data => {
      if (data.status === 0) {
        this.statusTypes = data.data;
      } else {

      }
    });
    this.commonXHRService.listOrganizationCurrentUser().then(data => {
      if (data.status === 0) {
        this.organizations = data.data;
      } else {

      }
    })
  }

  getItems(item) {
    return Object.keys(item);
  }
}
