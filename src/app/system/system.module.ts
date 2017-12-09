import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { CoreModule } from './../core/core.module';
import { CategoryComponent } from './category/category.component';

import { SystemComponent } from './system.component';
import { AssetDepartmentComponent } from 'app/system/asset-department/asset-department.component';
import { AssetDepartmentService } from 'app/system/asset-department/asset-department.service';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    SystemRoutingModule,
  ],
  declarations: [
    SystemComponent,
    CategoryComponent,
    AssetDepartmentComponent
  ],
  providers: [
    AssetDepartmentService
  ],
})
export class SystemModule { }
