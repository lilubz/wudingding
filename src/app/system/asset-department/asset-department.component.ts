import { Component, OnInit, OnDestroy, TemplateRef, } from '@angular/core';

import { AssetDepartmentService } from './asset-department.service';
import { CommonXHRService } from 'app/core/common-xhr.service';
import { UserStateService } from 'app/core/user-state.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewTree } from './newTree.model';
import { TreeNode } from 'primeng/primeng';

declare const swal: any;
@Component({
  selector: 'asset-department',
  templateUrl: './asset-department.component.html',
  styleUrls: ['./asset-department.component.scss']
})
export class AssetDepartmentComponent implements OnInit, OnDestroy {
  maxOrgTreeDepth = 0;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  departmentTree: TreeNode[];
  selectedDepartment: NewTree;
  departmentName?: string;
  departmentDescription?: string;
  departmentAddress?: string;
  oldDepartmentName?: string;
  constructor(
    private _service: AssetDepartmentService,
    private commonXHRService: CommonXHRService,
    private userStateService: UserStateService,
    private modalService: BsModalService
  ) { }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
    this.departmentName = this.selectedDepartment.label;
    this.departmentDescription = this.selectedDepartment.description;
    this.departmentAddress = this.selectedDepartment.address;
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  ngOnInit() {
    this.getNode()
  }
  /**
   * 节点变化
   * @param event
   */
  nodeSelect(event) {
    // console.log(event.node);
  }
  loadNode(event) {
    // console.log(event.node);
  }
  // expandAll() {
  //   this.departmentTree.forEach(node => {
  //     this.expandRecursive(node, true);
  //   });
  // }
  /**
   * 获取所有树节点
   */
  getNode() {
    const user = this.userStateService.getUser();
    this.commonXHRService.getTreeNodde({ organizationId: user.organizationId }).then(data => {
      if (data.status === 0) {
        // // console.log(data.data);
        this.departmentTree = [this.transformOrgToTreeNode(data.data)];
        this.maxOrgTreeDepth = this.getTreeDepth(this.departmentTree);
        // // console.log(this.departmentTree);
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
   * 获取树结构的最大深度
   * 2017-12-14 10:42:03
   * @author hzb
   * @param tree
   * @returns
   */
  getTreeDepth(tree: any[]): number {
    if (tree.length) {
      let maxDepthOfChild = 0;
      for (const item of tree) {
        let childDepth = 1;
        if (item.children) {
          childDepth += this.getTreeDepth(item.children);
        }
        if (childDepth > maxDepthOfChild) {
          maxDepthOfChild = childDepth;
        }
      }
      return maxDepthOfChild;
    } else {
      return 0;
    }
  }

  addDepartment() {
    if (this.checkForm()) {
      swal({
        title: '添加部门',
        text: '确认添加: ' + this.departmentName + ' 到 ' + this.selectedDepartment.label + ' 下吗？',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const params = {
              pid: this.selectedDepartment.data,
              departmentName: this.departmentName,
              departmentDescription: this.departmentDescription || '',
              departmentAddress: this.departmentAddress || ''
            }
            this._service.AddDepartment(params).then(data => {
              if (data.status === 0) {
                swal('添加成功', {
                  icon: 'success',
                });
                this.closeFirstModal();
                this.getNode();
              } else {
                swal(data.msg, {
                  icon: 'error',
                });
              }
            }).catch(error => {
              swal({
                title: '服务器异常',
                text: '',
                icon: 'error',
                button: '确认',
              });
            })
          } else {
          }
        });
    } else {
      swal({
        title: '',
        text: '部门名称不能为空',
        icon: 'warning',
        button: '确认',
      });
    }

  }

  updateDepartment() {
    if (this.checkForm()) {
      swal({
        title: '编辑部门',
        text: '确认修改当前部门名为' + this.departmentName + '吗？',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const params = {
              departmentId: this.selectedDepartment.data,
              departmentName: this.departmentName,
              departmentDescription: this.departmentDescription || '',
              departmentAddress: this.departmentAddress || ''
            }
            this._service.UpdateDepartment(params).then(data => {
              if (data.status === 0) {
                swal('修改成功', {
                  icon: 'success',
                });
                this.closeFirstModal();
                this.getNode();
              } else {
                swal(data.msg, {
                  icon: 'error',
                });
              }
            })
          } else {
          }
        });
    } else {
      swal({
        title: '',
        text: '部门名称不能为空',
        icon: 'warning',
        button: '确认',
      });
    }

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
        description: data.t.description,
        address: data.t.address,
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
  checkForm(): boolean {
    if (!this.departmentName) {
      return false;
    }
    return true;
  }
  // private expandRecursive(node: TreeNode, isExpand: boolean) {
  //   node.expanded = isExpand;
  //   if (node.children) {
  //     node.children.forEach(childNode => {
  //       this.expandRecursive(childNode, isExpand);
  //     });
  //   }
  // }
  ngOnDestroy() {
  }
}
