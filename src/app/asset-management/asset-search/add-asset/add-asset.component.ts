import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'asset-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {
  // @Input() set show(value: boolean) {
  //   if (value === true) {
  //     this.showModal();
  //   } else {
  //     this.hideModal();
  //   }
  // }

  // @ViewChild('addAssetModal') public addAssetModal: ModalDirective;
  modal;
  constructor() { }

  ngOnInit() {
  }

  save(modal) {

  }

  // showModal() {
  //   this.addAssetModal.show();
  // }

  // hideModal() {
  //   this.addAssetModal.hide();
  // }

}
