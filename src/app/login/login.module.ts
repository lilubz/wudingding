import { LoginService } from './login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login.component';
import { AboutComponent } from './about/about.component';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [
    SignInComponent,
    LoginComponent,
    AboutComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
