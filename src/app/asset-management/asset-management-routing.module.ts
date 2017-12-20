import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'asset-inventory',
        loadChildren: './asset-inventory/asset-inventory.module#AssetInventoryModule',
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
