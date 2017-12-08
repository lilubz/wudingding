import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { CoreModule } from './../core/core.module';

import { SystemComponent } from './system.component';
import { AssetCategoryComponent } from 'app/system/asset-category/asset-category.component';
import { AssetDepartmentComponent } from 'app/system/asset-department/asset-department.component';
import { AssetCategoryService } from 'app/system/asset-category/asset-category.service';
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
    AssetCategoryComponent,
    AssetDepartmentComponent
  ],
  providers: [
    AssetCategoryService,
    AssetDepartmentService
  ],
})
export class SystemModule { }
