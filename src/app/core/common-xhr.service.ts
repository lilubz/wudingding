import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserStateService } from './../core/user-state.service';
import { API } from './../core/api';
import { HttpService } from './../core/http.service';

@Injectable()
export class CommonXHRService {

  constructor(private httpService: HttpService, private userStateService: UserStateService, private router: Router) { }


}
