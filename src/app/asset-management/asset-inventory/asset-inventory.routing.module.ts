import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MarkComponent } from './mark/mark.component';
import { TaskComponent } from './task/task.component';
import { AssetInventoryComponent } from './asset-inventory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AssetInventoryComponent,
    children: [
      {
        path: 'task',
        component: TaskComponent,
        data: {
          title: '盘点任务'
        }
      },
      {
        path: 'mark',
        component: MarkComponent,
        data: {
          title: '盘点详情'
        }
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'task'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetInventoryRoutingModule { }
