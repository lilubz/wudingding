import { SystemComponent } from './system.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssetDepartmentComponent } from 'app/system/asset-department/asset-department.component';

import { CategoryComponent } from './category/category.component'
import { PermissionComponent } from './permission/permission.component'
import { SystemRoleComponent } from 'app/system/system-role/system-role.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-department',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SystemComponent,
    data: {
      title: '系统管理'
    },
    children: [
      {
        path: 'asset-department',
        component: AssetDepartmentComponent,
        data: {
          title: '部门管理'
        }
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: '类别管理'
        }
      },
      {
        path: 'system-role',
        component: SystemRoleComponent,
        data: {
          title: '角色管理'
        }
      },
      {
        path: 'permission',
        component: PermissionComponent,
        data: {
          title: '管理分配'
        }
      }
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
