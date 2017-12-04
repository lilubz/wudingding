import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth-guard.service';
import { CommonXHRService } from './common-xhr.service';
import { DateFormat } from './date-format.service';
import { HttpService } from './http.service';
import { UserStateService } from './user-state.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    AuthGuard,
    CommonXHRService,
    DateFormat,
    HttpService,
    UserStateService,
  ]
})
export class CoreModule { }
