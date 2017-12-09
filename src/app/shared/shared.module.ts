
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
} from 'ngx-bootstrap';



import {
  TreeDragDropService,
  TreeNode,
  ContextMenuModule,
  TabViewModule,

  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  DataTableModule,
  DropdownModule,
  DialogModule,
  FileUploadModule,
  GrowlModule,
  InputTextareaModule,
  InputTextModule,
  MegaMenuModule,
  MenuModule,
  PanelModule,
  SpinnerModule,
  TieredMenuModule,
  TreeModule,
  SharedModule as _SharedModule,
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
import { PaginatorComponent } from './paginator/paginator.component';
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

    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    GrowlModule,
    InputTextareaModule,
    InputTextModule,
    MegaMenuModule,
    MenuModule,
    PanelModule,
    SpinnerModule,
    TieredMenuModule,
    TreeModule,
    _SharedModule,
    TreeModule,
    GrowlModule, ButtonModule, ContextMenuModule, TabViewModule
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
    PaginatorComponent,
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

    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    GrowlModule,
    InputTextareaModule,
    InputTextModule,
    MegaMenuModule,
    MenuModule,
    PanelModule,
    SpinnerModule,
    TieredMenuModule,
    TreeModule,
    _SharedModule,
    TreeModule,
    GrowlModule, ButtonModule, ContextMenuModule, TabViewModule,

    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,

    // LayoutComponent,
    AssetHeaderComponent,
    AssetSidebarComponent,
    BreadcrumbComponent,
    PaginatorComponent,
  ],
  providers: [
    LoginService,
    TreeDragDropService
  ]
})
export class SharedModule { }
