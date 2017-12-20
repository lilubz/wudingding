import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { AssetInventoryRoutingModule } from './asset-inventory.routing.module';

import { AssetInventoryComponent } from './asset-inventory.component'
import { MarkComponent } from './mark/mark.component'
import { TaskComponent } from './task/task.component'
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AssetInventoryRoutingModule
  ],
  declarations: [
    AssetInventoryComponent,
    MarkComponent,
    TaskComponent
  ]
})
export class AssetInventoryModule { }
