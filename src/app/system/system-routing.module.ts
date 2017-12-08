import { SystemComponent } from './system.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
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
        path: 'category',
        component: CategoryComponent,
        data: {
          title: '类别管理'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'system'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
