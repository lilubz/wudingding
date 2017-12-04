import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import {
  BsDropdownModule,
  TabsModule
} from 'ngx-bootstrap';

// import { LayoutComponent } from './layout/layout.component';
import { AssetHeaderComponent } from './asset-header/asset-header.component';
import { AssetSidebarComponent } from './asset-sidebar/asset-sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { AsideToggleDirective } from './aside.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
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
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    TabsModule,

    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,

    // LayoutComponent,
    AssetHeaderComponent,
    AssetSidebarComponent,
    BreadcrumbComponent,
  ]
})
export class SharedModule { }
