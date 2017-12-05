import { zhCn } from 'ngx-bootstrap/locale';
import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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

  bsValue: any;

  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue',
    locale: 'zhCn',
    showWeekNumbers: false
  }
  constructor() { }

  ngOnInit() {
  }

  getItems(item) {
    return Object.keys(item);
  }
}
