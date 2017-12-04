import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';

// import { LayoutComponent } from './layout/layout.component';
import { AssetHeaderComponent } from './asset-header/asset-header.component';
import { AssetSidebarComponent } from './asset-sidebar/asset-sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NAV_DROPDOWN_DIRECTIVES } from 'app/shared/nav-dropdown.directive';
import { BreadcrumbsComponent } from 'app/shared/breadcrumb.component';
import { AsideToggleDirective } from 'app/shared/aside.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    // LayoutComponent,
    AssetHeaderComponent,
    AssetSidebarComponent,
    BreadcrumbComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // LayoutComponent,
    AssetHeaderComponent,
    AssetSidebarComponent,
    BreadcrumbComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
  ]
})
export class SharedModule { }
