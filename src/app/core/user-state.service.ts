import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User } from './../model/User.model';
@Injectable()
export class UserStateService {

  setUser(user: User) {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }
  getUser(): User {
    let user = undefined;
    if (!!sessionStorage.getItem('user')) {
      user = sessionStorage.getItem('user');
      if (user !== 'undefined' && user !== 'null' && user !== '') {
        user = JSON.parse(user);
      } else {
        user = undefined;
      }
    }
    return user
  }
}
