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
export class AssetDepartmentComponent implements OnInit {
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

  addDepartmentName?: string;
  addDepartmentDescription?: string;
  addDepartmentAddress?: string;

  updateDepartmentName?: string;
  updateDepartmentDescription?: string;
  updateDepartmentAddress?: string;

  departmentList: any[] = [];
  selectedDepartmentList: any[] = [];

  selectedDepartmentList2: any[] = [];
  selectedData: NewTree;
  ss: any[] = [];


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
  }
  openModalWithClass2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    );
    this.updateDepartmentName = this.selectedData.label;
    this.updateDepartmentDescription = this.selectedData.description;
    this.updateDepartmentAddress = this.selectedData.address;
  }
  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal2() {
    this.modalRef2.hide();
    this.modalRef2 = null;

  }

  ngOnInit() {
    this.getNode();
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
  /**
   * 获取所有树节点
   */
  getNode() {
    const user = this.userStateService.getUser();
    this.commonXHRService.listOrganizationChildren({ organizationId: user.organizationId }).then(data => {
      if (data.status === 0) {
        // // console.log(data.data);
        this.departmentTree = [this.transformOrgToTreeNode(data.data)];
        this.maxOrgTreeDepth = this.getTreeDepth(this.departmentTree);
        this.departmentList = this.getDepartmentListByDepth(this.maxOrgTreeDepth);
        this.selectedDepartmentList[0] = this.departmentTree[0];
        this.selectDepartment(null, 0);
        // console.log(this.departmentTree);
        // // console.log(this.departmentTree);
      } else {

      }
    }).catch(error => {
      // console.dir(error);
      swal({ title: '服务器错误', text: '错误码' + error.status, icon: 'error', button: '确认', });
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

  getDepartmentListByDepth(maxOrgTreeDepth) {
    const list = [];
    for (let i = 0; i < maxOrgTreeDepth; i++) {
      list.push(true);
    }
    return list;
  }

  selectDepartment(event, index) {
    // console.log(this.selectedDepartmentList);
    /**
      * 上级部门名称的集合；
     */
    this.selectedDepartmentList2 = this.selectedDepartmentList;
    if (!this.selectedDepartmentList2[index]) {
      this.selectedDepartmentList2 = this.selectedDepartmentList2.slice(0, index);
    }
    /**
     * 作用默认选中第一个值；
    */
    this.selectedDepartmentList = this.selectedDepartmentList.slice(0, index + 1);
    if (this.selectedDepartmentList[index].children) {
      this.selectedDepartmentList[index + 1] = '';
    }
    /**
     * 添加、编辑绑定的值；
    */
    this.selectedData = this.selectedDepartmentList[index];
    if (!this.selectedData) {
      this.selectedData = this.selectedDepartmentList[index - 1];
    } else {
      this.selectedData.expanded = true;
    }

  }

  addDepartment() {
    if (this.checkForm()) {
      swal({
        title: '确认添加部门: ' + '“' + this.addDepartmentName + '”' + ' 到 ' + '“' + this.selectedData.label + '”' + ' 下吗？',
        text: '',
        icon: 'warning',
        buttons: ['取消', '确定'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const params = {
            pid: this.selectedData.data,
            departmentName: this.addDepartmentName,
            departmentDescription: this.addDepartmentDescription || '',
            departmentAddress: this.addDepartmentAddress || ''
          }
          this._service.AddDepartment(params).then(data => {
            if (data.status === 0) {
              swal('添加成功', {
                icon: 'success',
              });
              this.closeModal();
              this.getNode();

            } else {
              swal(data.msg, {
                icon: 'error',
              });
            }
          }).catch(error => {
            swal({
              title: '服务器异常', text: '错误码:' + error.status, icon: 'error', button: '确认',
            });
          })
        } else {
        }
      });
    } else {
      swal({
        title: '', text: '部门名称不能为空', icon: 'warning', button: '确认',
      });
    }

  }

  updateDepartment() {
    if (this.checkForm2()) {
      swal({
        title: '编辑部门',
        text: '确认修改当前部门信息吗？',
        icon: 'warning',
        buttons: ['取消', '确定'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const params = {
            departmentId: this.selectedData.data,
            departmentName: this.updateDepartmentName,
            departmentDescription: this.updateDepartmentDescription || '',
            departmentAddress: this.updateDepartmentAddress || ''
          }
          this._service.UpdateDepartment(params).then(data => {
            if (data.status === 0) {
              swal('修改成功', {
                icon: 'success',
              });
              this.closeModal2();
              this.getNode();
            } else {
              swal(data.msg, {
                icon: 'error',
              });
            }
          }).catch(error => {
            swal({
              title: '服务器异常', text: '错误码:' + error.status, icon: 'error', button: '确认',
            });
          })
        } else {
        }
      });
    } else {
      swal({
        title: '', text: '部门名称不能为空', icon: 'warning', button: '确认',
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
    if (!this.addDepartmentName) {
      return false;
    }
    return true;
  }

  checkForm2(): boolean {
    if (!this.updateDepartmentName) {
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
}
