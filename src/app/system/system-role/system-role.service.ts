import { Injectable, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { API } from './../../core/api';
import { HttpService } from './../../core/http.service';


@Injectable()
export class SystemRoleService {
    constructor(private http: HttpService) { }
}
