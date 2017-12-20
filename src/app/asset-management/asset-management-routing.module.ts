
import { AssetAddComponent } from './asset-add/asset-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AssetManagementComponent } from './asset-management.component';
import { AssetSearchComponent } from './asset-search/asset-search.component';
import { AssetSearchParentComponent } from 'app/asset-management/asset-search/asset-search-parent.component';
import { AssetStatisticComponent } from 'app/asset-management/asset-search/asset-statistic/asset-statistic.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-search-parent/asset-search',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AssetManagementComponent,
    children: [
      {
        path: 'asset-search-parent',
        component: AssetSearchParentComponent,
        data: {
          title: '资产查询'
        },
        children: [
          {
            path: 'asset-search',
            component: AssetSearchComponent
          },
          {
            path: 'asset-statistic',
            component: AssetStatisticComponent
          }
        ]
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
        loadChildren: './asset-inventory/asset-inventory.module#AssetInventoryModule',
        data: {
          title: '资产盘点'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'asset-search-parent/asset-search'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
