import { AssetAddComponent } from './asset-add/asset-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AssetInventoryComponent } from './asset-inventory/asset-inventory.component';
import { AssetManagementComponent } from './asset-management.component';
import { AssetStatisticComponent } from './asset-statistic/asset-statistic.component';
import { AssetSearchComponent } from './asset-search/asset-search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-search',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AssetManagementComponent,
    children: [
      {
        path: 'asset-search',
        component: AssetSearchComponent,
        data: {
          title: '资产查询'
        }
      },
      {
        path: 'asset-statistic',
        component: AssetStatisticComponent,
        data: {
          title: '资产统计'
        }
      },
      {
        path: 'asset-add',
        component: AssetAddComponent,
        data: {
          title: '新增资产'
        }
      },
      {
        path: 'asset-inventory',
        component: AssetInventoryComponent,
        data: {
          title: '资产盘点'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'asset-search'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
