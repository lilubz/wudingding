import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetSearchComponent } from './asset-search/asset-search.component';
import { AssetInventoryComponent } from './asset-inventory/asset-inventory.component';
import { AssetStatisticComponent } from './asset-statistic/asset-statistic.component';
import { AssetManagementComponent } from './asset-management.component';
import { SharedModule } from '../shared/shared.module';
import { AssetManagementRoutingModule } from 'app/asset-management/asset-management-routing.module';

import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';
import { AssetSearchService } from 'app/asset-management/asset-search/asset-search.service';
defineLocale('zhCn', zhCn);

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AssetManagementRoutingModule
  ],
  declarations: [
    AssetSearchComponent,
    AssetInventoryComponent,
    AssetStatisticComponent,
    AssetManagementComponent
  ],
  providers: [
    AssetSearchService
  ]
})
export class AssetManagementModule { }
