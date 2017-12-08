import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';

import { SharedModule } from './../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { CoreModule } from './../core/core.module';
import { CategoryComponent } from './category/category.component';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    SystemRoutingModule,
  ],
  declarations: [
    SystemComponent,
    CategoryComponent
  ]
})
export class SystemModule { }
