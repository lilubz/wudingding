import { SystemComponent } from './system.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssetDepartmentComponent } from 'app/system/asset-department/asset-department.component';
import { AssetCategoryComponent } from 'app/system/asset-category/asset-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-department',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: 'asset-department',
        component: AssetDepartmentComponent,
        data: {
          title: '部门管理'
        }
      },
      {
        path: 'asset-category',
        component: AssetCategoryComponent,
        data: {
          title: '类别管理'
        }
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'asset-department'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
