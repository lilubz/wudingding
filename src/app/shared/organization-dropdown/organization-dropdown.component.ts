import { CommonXHRService } from 'app/core/common-xhr.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/primeng';
import { OnDestroy } from '../../../../node_modules/_@angular_core@4.3.4@@angular/core/src/metadata/lifecycle_hooks';

declare const swal: any;

/**
 * 组织部门下拉框公共组件
 *
 * @Input() selectedOrg:TreeNode
 * @Input() organizationId:number
 *
 * 2017-12-22 11:54:50
 * @author hzb
 * @export
 * @class OrganizationDropdownComponent
 */
@Component({
  selector: 'asset-organization-dropdown',
  templateUrl: './organization-dropdown.component.html',
  styleUrls: ['./organization-dropdown.component.scss']
})
export class OrganizationDropdownComponent implements OnInit, OnDestroy {
  _selectedOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  @Input()
  set selectedOrg(value) {
    console.log(value);
    this._selectedOrg = value;
    this.expandParentRecursive(this.selectedOrg, true);
  };
  get selectedOrg(): TreeNode {
    return this._selectedOrg;
  }
  @Input() organizationId: number;
  @Output() selectedOrgChange: EventEmitter<any> = new EventEmitter();
  organizations: TreeNode[] = [];
  selectVisiable = false;

  constructor(
    private commonXHRService: CommonXHRService,
  ) { }

  ngOnInit() {
    document.body.addEventListener('click', this.hideOrgSelect);

    this.commonXHRService.listOrganizationChildren({
      organizationId: ''
    }).then(data => {
      if (data.status === 0) {
        this.organizations = [this.transformOrgToTreeNode(data.data, undefined)];
        this.selectedOrg = this.getOrgNodeById(this.organizationId, this.organizations[0]) || this.selectedOrg;
        this.selectedOrgChange.emit(this.selectedOrg);
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });

  }

  ngOnDestroy() {
    document.body.removeEventListener('click', this.hideOrgSelect);
  }

  hideOrgSelect = () => {
    this.selectVisiable = false;
  }
  nodeSelect(event) {
    if (this.selectedOrg === event.node) {
      this.selectedOrg = {
        data: '',
        label: '',
        parent: undefined
      };
    } else {
      this.selectedOrg = event.node;
    }
    this.selectVisiable = false;
    this.selectedOrgChange.emit(this.selectedOrg);
  }

  expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  expandParentRecursive(node: TreeNode, isExpand: boolean) {
    if (node.parent) {
      node.parent.expanded = isExpand;
      if (node.parent.parent) {
        this.expandParentRecursive(node.parent, isExpand);
      }
    }
  }

  transformOrgToTreeNode(data, parent) {
    if (data) {
      const temp = {
        collapsedIcon: 'fa-folder',
        data: data.t.organizationId,
        expandedIcon: 'fa-folder-open',
        label: data.t.name,
        children: null,
        parent: parent
      }
      if (data.children) {
        const arr = []
        for (const item of data.children) {
          arr.push(this.transformOrgToTreeNode(item, temp));
        }
        temp.children = arr;
      }
      return temp;
    }
    return null;
  }

  getOrgNodeById(organizationId: number, data: TreeNode) {
    if (organizationId) {
      if (organizationId === data.data) {
        return data;
      } else {
        if (data.children) {
          let fromChildren;
          for (const item of data.children) {
            fromChildren = this.getOrgNodeById(organizationId, item);
            if (fromChildren) {
              break;
            }
          }
          return fromChildren;
        }
      }
    }
  }
}
