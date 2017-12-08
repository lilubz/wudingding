
import { LoginService } from './../login/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BsDropdownModule,
  BsDatepickerModule,
  TabsModule,
  ModalModule,

  PaginationModule,
} from 'ngx-bootstrap';
import {
  TreeModule, TreeDragDropService, TreeNode, GrowlModule,
  ButtonModule, ContextMenuModule, TabViewModule, CodeHighlighterModule
} from 'primeng/primeng';


// import { LayoutComponent } from './layout/layout.component';
import { AssetHeaderComponent } from './asset-header/asset-header.component';
import { AssetSidebarComponent } from './asset-sidebar/asset-sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { AsideToggleDirective } from './aside.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TreeModule,
    GrowlModule, ButtonModule, ContextMenuModule, TabViewModule, CodeHighlighterModule
  ],
  declarations: [
    // LayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    AssetHeaderComponent,
    AssetSidebarComponent,
    BreadcrumbComponent,
    AssetTableComponent,
    PaginationComponent,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    ModalModule,
    PaginationModule,
    TreeModule,
    GrowlModule, ButtonModule, ContextMenuModule, TabViewModule, CodeHighlighterModule,

    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,

    // LayoutComponent,
    AssetHeaderComponent,
    AssetSidebarComponent,
    BreadcrumbComponent,
    PaginationComponent,
  ],
  providers: [
    LoginService,
    TreeDragDropService
  ]
})
export class SharedModule { }
