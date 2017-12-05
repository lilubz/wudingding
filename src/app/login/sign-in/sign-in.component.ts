import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';

declare const swal: any;
@Component({
  selector: 'asset-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username = '';
  password = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    if (!this.username) {
      swal({
        text: '请输入用户名',
        button: '确认',
      });
      return false;
    } else if (!this.password) {
      swal({
        text: '请输入密码',
        button: '确认',
      });
      return false;
    }

    this.loginService.signIn({
      username: this.username,
      password: this.password
    });

  }
}
