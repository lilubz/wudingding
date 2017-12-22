import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { CoreModule } from './../core/core.module';
import { CategoryComponent } from './category/category.component';

import { SystemComponent } from './system.component';
import { AssetDepartmentComponent } from 'app/system/asset-department/asset-department.component';
import { AssetDepartmentService } from 'app/system/asset-department/asset-department.service';
import { SystemRoleComponent } from 'app/system/system-role/system-role.component';
import { SystemRoleService } from 'app/system/system-role/system-role.service';
import { AddUserComponent } from './add-user/add-user.component';
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
    AssetDepartmentComponent,
    SystemRoleComponent,
    AddUserComponent
  ],
  providers: [
    AssetDepartmentService,
    SystemRoleService
  ],
})
export class SystemModule { }
