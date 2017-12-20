import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, OnDestroy, TemplateRef, } from '@angular/core';
import { SystemRoleService, } from './system-role.service';
import { RoleModel } from 'app/system/system-role/role.Model';

@Component({
  selector: 'asset-system-role',
  templateUrl: './system-role.component.html',
  styleUrls: ['./system-role.component.scss']
})
export class SystemRoleComponent implements OnInit, OnDestroy {
  addModalRef: BsModalRef;
  editModalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  editForm: RoleModel = new RoleModel();
  roleList: any[] = [];

  pageSize = 10;
  pageNumber = 1;
  total = 0;
  pageFirst = 0;

  constructor(private _service: SystemRoleService,
    private modalService: BsModalService) { }

  ngOnInit() {
    console.log(this.editForm)
  }
  showEditModal(template: TemplateRef<any>) {
    this.editModalRef = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }
  showAddModal(template: TemplateRef<any>) {
    this.addModalRef = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
  }
  pageChanged(event) {
    console.log(event);

  }



  ngOnDestroy() {
  }
}
