import { AuthGuard } from './core/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-management',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: ''
    },
    children: [
      {
        path: 'asset-management',
        loadChildren: './asset-management/asset-management.module#AssetManagementModule',
        data: {
          title: '资产管理'
        }
      },
      {
        path: 'system',
        loadChildren: './system/system.module#SystemModule',
        data: {
          title: '系统管理'
        }
      },
    ]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: '**',
    redirectTo: 'asset-management'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
