import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetSearchComponent } from './asset-search/asset-search.component';
import { AssetInventoryComponent } from './asset-inventory/asset-inventory.component';
import { AssetStatisticComponent } from './asset-statistic/asset-statistic.component';
import { AssetManagementComponent } from './asset-management.component';
import { SharedModule } from 'app/shared/shared.module';
import { AssetManagementRoutingModule } from 'app/asset-management/asset-management-routing.module';

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
  ]
})
export class AssetManagementModule { }
