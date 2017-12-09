import { Component, OnInit, OnDestroy, } from '@angular/core';

import { AssetDepartmentService } from './asset-department.service';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/components/common/treenode';
import { CommonXHRService } from 'app/core/common-xhr.service';
import { UserStateService } from 'app/core/user-state.service';

// import { BsModalRef } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap/modal/modal-options.class';
// import { BsModalService } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap/modal/bs-modal.service';
// import { TemplateRef } from '../../../../node_modules/_@angular_core@4.3.4@@angular/core/src/linker/template_ref';

declare const swal: any;
@Component({
  selector: 'asset-department',
  templateUrl: './asset-department.component.html',
  styleUrls: ['./asset-department.component.scss']
})
export class AssetDepartmentComponent implements OnInit, OnDestroy {

  // modalRef: BsModalRef;
  // modalRef2: BsModalRef;
  // config = {
  //   animated: true,
  //   keyboard: false,
  //   backdrop: true,
  //   ignoreBackdropClick: false
  // };

  departmentTree: TreeNode[];
  selectedDepartment: TreeNode;
  departmentName?: string;
  departmentDescription?: string;
  departmentAddress?: string;

  constructor(
    private _service: AssetDepartmentService,
    private commonXHRService: CommonXHRService,
    private userStateService: UserStateService,
    // private modalService: BsModalService
  ) { }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
  // openModalWithClass(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign({}, this.config, { class: 'gray modal-lg' })
  //   );
  // }
  // openModal2(template: TemplateRef<any>) {
  //   this.modalRef2 = this.modalService.show(template, { class: 'second' });
  // }
  // closeFirstModal() {
  //   this.modalRef.hide();
  //   this.modalRef = null;
  // }

  ngOnInit() {
    this.getNode()
  }
  /**
   * 节点变化
   * @param event
   */
  nodeSelect(event) {
    console.log(event.node);

  }
  loadNode(event) {
    console.log(event.node);
  }
  /**
   * 获取所有树节点
   */
  getNode() {
    const user = this.userStateService.getUser();
    this.commonXHRService.getTreeNodde({ organizationId: user.organizationId }).then(data => {
      if (data.status === 0) {
        console.log(data.data);
        this.departmentTree = [this.transformOrgToTreeNode(data.data)];
        console.log(this.departmentTree);
      } else {

      }
    }).catch(error => {
      swal({
        title: '服务器异常',
        text: '',
        icon: 'error',
        button: '确认',
      });
    })
  }
  /**
   * 遍历数组
   * @param data 获取的数组
   */
  transformOrgToTreeNode(data) {
    if (data) {
      const temp = {
        collapsedIcon: 'fa-folder',
        data: data.t.organizationId,
        expandedIcon: 'fa-folder-open',
        label: data.t.name,
        children: null
      }
      if (data.children) {
        const arr = []
        for (const item of data.children) {
          arr.push(this.transformOrgToTreeNode(item));
        }
        temp.children = arr;
      }
      return temp;
    }
    return null;
  }

  ngOnDestroy() {
  }
}
