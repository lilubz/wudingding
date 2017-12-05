import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';

declare const swal: any;
@Component({
  selector: 'asset-header',
  templateUrl: './asset-header.component.html',
  styleUrls: ['./asset-header.component.scss']
})
export class AssetHeaderComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  logout() {
    this.loginService.logout();
  }
}
