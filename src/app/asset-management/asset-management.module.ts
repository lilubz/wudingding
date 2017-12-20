import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetSearchComponent } from './asset-search/asset-search.component';
import { AssetInventoryComponent } from './asset-inventory/asset-inventory.component';
import { AssetManagementComponent } from './asset-management.component';
import { SharedModule } from '../shared/shared.module';
import { AssetManagementRoutingModule } from 'app/asset-management/asset-management-routing.module';

import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';
import { AssetSearchParentComponent } from './asset-search/asset-search-parent.component';
import { AssetSearchService } from 'app/asset-management/asset-search/asset-search.service';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetAddService } from 'app/asset-management/asset-add/asset-add.service';
import { AssetStatisticComponent } from 'app/asset-management/asset-search/asset-statistic/asset-statistic.component';
import { AssetStatisticService } from 'app/asset-management/asset-search/asset-statistic/asset-statistic.service';
import { AssetDetailComponent } from 'app/asset-management/asset-search/asset-detail/asset-detail.component';
import { AssetDetailService } from 'app/asset-management/asset-search/asset-detail/asset-detail.service';

defineLocale('zhCn', zhCn);

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AssetManagementRoutingModule,
  ],
  declarations: [
    AssetSearchComponent,
    AssetStatisticComponent,
    AssetManagementComponent,
    AssetAddComponent,
    AssetSearchParentComponent,
    AssetDetailComponent
  ],
  providers: [
    AssetStatisticService,
    AssetSearchService,
    AssetAddService,
    AssetDetailService
  ]
})
export class AssetManagementModule { }
