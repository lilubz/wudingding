import { zh } from './../../core/date-localization';
import { Employee } from './../../model/Employee.model';
import { UserStateService } from './../../core/user-state.service';
import { AddAsset } from './AddAsset.model';
import { EditAsset } from './EditAsset.model';
import { Asset } from './asset.model';
import { AssetSearchService } from './asset-search.service';
import { Organization } from './../../model/Organization.model';
import { AssetStatusType } from './../../model/AssetStatusType.model';
import { CommonXHRService } from './../../core/common-xhr.service';
import { zhCn } from 'ngx-bootstrap/locale';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AssetCategory } from 'app/model/AssetCategory.model';
import * as moment from 'moment';
import { ModalDirective, BsModalRef, BsModalService } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap';
import { forEach } from '../../../../node_modules/_@angular_router@4.3.4@@angular/router/src/utils/collection';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/components/common/treenode';
import { API } from 'app/core/api';

declare const swal: any;
@Component({
  selector: 'asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.scss']
})
export class AssetSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  uploadAssetUrl = API.uploadAssetUrl;
  zh;
  addAssetModalRef: BsModalRef;
  editAssetModalRef: BsModalRef;
  assetDetailModalRef: BsModalRef;
  assetRelationModalRef: BsModalRef;
  uploadAssetModalRef: BsModalRef;
  modalConfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  total = 0;
  pageNumber = 1;
  pageSize = 10;
  pageFirst = 0;

  today = moment().toDate();
  assetList: Asset[] = [];
  dateRange: Date[] = [moment().subtract(7, 'd').toDate(), new Date()];
  datePickerConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-blue',
    locale: 'zhCn',
    showWeekNumbers: false
  }

  categories: AssetCategory[];
  statusTypes: AssetStatusType[];
  searchOrganizations: TreeNode[] = [];
  addOrganizations: TreeNode[] = [];
  editOrganizations: TreeNode[] = [];
  selectedCategory = '';
  selectedOrganization = '';
  selectedAssetStatus = '';
  searchBeginDate = '';
  searchEndDate = '';
  selectedDeleteAsset: Asset;
  selectedEmployee: Employee = new Employee();
  addFormEmployee: Employee = new Employee();
  editFormEmployee: Employee = new Employee();
  employeeSuggestions: Employee[] = [];

  showSearchOrgSelect = false;
  showAddOrgSelect = false;
  showEditOrgSelect = false;
  selectedSearchOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  selectedAddOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  selectedEditOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };

  addForm: AddAsset = new AddAsset();
  addFormCategory: AssetCategory | '' = '';
  editForm: EditAsset | Asset = new EditAsset();
  assetDetail: any = {};
  editFormCategory: AssetCategory | '' = '';
  assetRelationList: any[] = [];

  uploadSteps = [
    { label: '模板下载', command: (event: any) => { console.log(event); this.activeUploadStepIndex = 0; } },
    { label: '填写数据', command: (event: any) => { console.log(event); this.activeUploadStepIndex = 1; } },
    { label: '文件上传', command: (event: any) => { console.log(event); this.activeUploadStepIndex = 2; } }
  ];
  activeUploadStepIndex = 0;

  constructor(
    private commonXHRService: CommonXHRService,
    private assetSearchService: AssetSearchService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.zh = zh;
    document.body.addEventListener('click', this.hideOrgSelect);

    this.commonXHRService.listAssetCategory().then(data => {
      if (data.status === 0) {
        this.categories = data.data;
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });

    this.commonXHRService.listAssetStatusType().then(data => {
      if (data.status === 0) {
        this.statusTypes = data.data;
        this.selectedAssetStatus = this.statusTypes[0].assetStatusTypeName;
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });

    this.commonXHRService.listOrganizationChildren({
      organizationId: ''
    }).then(data => {
      if (data.status === 0) {
        this.searchOrganizations = [this.transformOrgToTreeNode(data.data, undefined)];
        this.addOrganizations = [this.transformOrgToTreeNode(data.data, undefined)];
        this.editOrganizations = [this.transformOrgToTreeNode(data.data, undefined)];
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });
    this.search();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.hideOrgSelect);
  }

  hideOrgSelect = () => {
    this.showSearchOrgSelect = false;
    this.showAddOrgSelect = false;
    this.showEditOrgSelect = false;
  }

  beforeSearch() {
    this.pageNumber = 1;
    this.total = 0;
    this.pageFirst = 0;
    this.search();
  }

  search() {
    if (this.checkParams()) {
      this.assetSearchService.listAssetBasic({
        organizationId: this.selectedOrganization || '',
        assetCategoryId: this.selectedCategory,
        useStatus: this.selectedAssetStatus,
        startTimeString: this.searchBeginDate ? moment(this.searchBeginDate).format('YYYY-MM-DD') : '',
        endTimeString: this.searchEndDate ? moment(this.searchEndDate).format('YYYY-MM-DD') : '',
        employeeName: this.selectedEmployee ? this.selectedEmployee.employeeName || '' : '',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }).then(data => {
        if (data.status === 0) {
          this.assetList = data.data.list;
          this.total = data.data.total;
        } else {
          this.assetList = [];
          swal({ text: data.msg, icon: 'warning', button: '确认', });
        }
      });
    }
  }

  addAsset() {
    if (this.checkAddForm()) {
      this.assetSearchService.addAssetInfo({
        assetName: this.addForm.assetName,
        brandSpecification: this.addForm.brandSpecification,
        majorAssetSerialNumber: this.addForm.majorAssetSerialNumber,
        organizationId: this.addForm.organizationId,
        assetCategoryId: this.addForm.assetCategoryId,
        employeeNumber: this.addFormEmployee.employeeNumber,
        useStatus: this.addForm.useStatus,
        batchSerialNumber: this.addForm.batchSerialNumber,
        storageLocation: this.addForm.storageLocation,
        purchaseTime: this.addForm.purchaseTime ? moment(this.addForm.purchaseTime).format('YYYY-MM-DD') : '',
        purchaseAmount: this.addForm.purchaseAmount,
        monthOfDepreciation: this.addForm.monthOfDepreciation,
        residualRatio: this.addForm.residualRatio,
      }).then(data => {
        if (data.status === 0) {
          swal({ title: '保存成功', text: data.msg, icon: 'success', button: '确认' });
          this.addAssetModalRef.hide();
        } else {
          swal({ title: '保存失败', text: data.msg, icon: 'warning', button: '确认' });
        }
      });
    }
  }
  editAsset() {
    if (this.checkEditForm()) {
      this.assetSearchService.updateAssetInfo({
        assetId: this.editForm.assetId || '',
        assetSerialNumber: this.editForm.assetSerialNumber || '',
        assetName: this.editForm.assetName || '',
        brandSpecification: this.editForm.brandSpecification || '',
        majorAssetSerialNumber: this.editForm.majorAssetSerialNumber || '',
        organizationId: this.editForm.organizationId || '',
        assetCategoryId: this.editForm.assetCategoryId || '',
        employeeNumber: this.editFormEmployee.employeeNumber,
        useStatus: this.editForm.useStatus || '',
        batchSerialNumber: this.editForm.batchSerialNumber || '',
        storageLocation: this.editForm.storageLocation || '',
        purchaseTime: this.editForm.purchaseTime ? moment(this.editForm.purchaseTime).format('YYYY-MM-DD') : '',
        purchaseAmount: this.editForm.purchaseAmount || '',
        monthOfDepreciation: this.editForm.monthOfDepreciation || '',
        residualRatio: this.editForm.residualRatio || '',
      }).then(data => {
        if (data.status === 0) {
          swal({ title: '保存成功', text: data.msg, icon: 'success', button: '确认' });
          this.search();
          this.editAssetModalRef.hide();
        } else {
          swal({ title: '保存失败', text: data.msg, icon: 'warning', button: '确认' });
        }
      });
    }
  }
  deleteAsset() {
    this.assetSearchService.deleteAssetInfo({
      assetSerialNumber: this.selectedDeleteAsset.assetSerialNumber || ''
    }).then(data => {
      if (data.status === 0) {
        this.search();
        swal({ title: '删除成功', icon: 'success', button: '确认', });
      } else {
        swal({ title: '删除失败', text: data.msg, icon: 'warning', button: '确认', });
      }
    });
  }

  searchEmployee(event) {
    // console.log(event);
    this.commonXHRService.listEmployeeSimpleCurrentUser({
      employeeName: event.query
    }).then(data => {
      if (data.status === 0) {
        this.employeeSuggestions = data.data;
      } else {

      }
    });
  }

  checkParams() {
    if (!this.dateRange || this.dateRange.length < 2) {
      swal({ text: '请选择录入时间段', icon: 'warning', button: '确认', });
      return false;
    }
    return true;
  }

  checkAddForm() {
    if (!this.addForm.assetName) {
      swal({ text: '请输入资产名称', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.organizationId) {
      swal({ text: '请输入组织部门', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.assetCategoryId) {
      swal({ text: '请输入资产类型', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addFormEmployee || !this.addFormEmployee.employeeNumber) {
      swal({ text: '请输入使用人', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.purchaseTime) {
      swal({ text: '请输入购买时间', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.purchaseAmount) {
      swal({ text: '请输入购买金额', icon: 'warning', button: '确认' });
      return false;
    }
    return true
  }
  checkEditForm() {
    if (!this.editForm.assetName) {
      swal({ text: '请输入资产名称', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editForm.organizationId) {
      swal({ text: '请输入组织部门', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editForm.assetCategoryId) {
      swal({ text: '请输入资产类型', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editFormEmployee || !this.editFormEmployee.employeeNumber) {
      swal({ text: '请输入使用人', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editForm.purchaseTime) {
      swal({ text: '请输入购买时间', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editForm.purchaseAmount) {
      swal({ text: '请输入购买金额', icon: 'warning', button: '确认' });
      return false;
    }
    return true
  }

  pageChanged(event) {
    this.pageNumber = event.page + 1;
    this.pageSize = event.rows;
    this.pageFirst = event.first;
    this.search();
  }

  showAddModal(modal) {
    this.addFormInit();
    this.addAssetModalRef = this.modalService.show(modal);
  }

  showReviewModal(asset: Asset) {
    swal({
      title: '确认审核该资产?',
      text: `${asset.assetName}`,
      icon: 'warning',
      buttons: true
    }).then((review) => {
      if (review) {
        this.reviewAsset(asset.assetSerialNumber);
      }
    });
  }

  showEditModal(asset: any, modal) {
    this.editForm = Object.assign({}, asset);
    this.editFormCategory = '';
    if (asset.organizationId) {
      this.selectedEditOrg = this.getOrgNodeById(asset.organizationId, this.editOrganizations[0]) || this.selectedEditOrg;
      this.expandParentRecursive(this.selectedEditOrg, true);
      console.log(this.editOrganizations);
    }
    for (const category of this.categories) {
      if (category.assetCategoryId === this.editForm.assetCategoryId) {
        this.editFormCategory = category;
      }
    }
    this.editFormEmployee = {
      employeeName: asset.employeeName || '',
      employeeNumber: asset.employeeNumber || ''
    }
    // this.editForm.employeeNumber = this.editFormEmployee.employeeNumber;
    this.editForm.purchaseTime = asset.purchaseTime ? moment(asset.purchaseTime).toDate() : '';
    // console.log(this.editForm);
    this.editAssetModalRef = this.modalService.show(modal, Object.assign({}, this.modalConfig, { class: 'modal-primary' }));
  }

  showDeleteModal(asset: Asset) {
    this.selectedDeleteAsset = asset;
    swal({
      title: '确认删除该资产?',
      text: `${asset.assetName}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.deleteAsset();
      }
    });
  }

  showDetailModal(asset, modal) {
    this.assetSearchService.getAssetDetailInfo({
      assetSerialNumber: asset.assetSerialNumber
    }).then(data => {
      if (data.status === 0) {
        this.assetDetail = data.data;
        this.assetDetailModalRef = this.modalService.show(modal, Object.assign({}, this.modalConfig, { class: 'modal-lg modal-info' }));
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });
  }

  showAssetRelationModal(asset, modal) {
    this.assetSearchService.listAssetInfoByMajorAsset({
      assetSerialNumber: asset.majorAssetSerialNumber
    }).then(data => {
      if (data.status === 0) {
        this.assetRelationList = data.data;
        this.assetRelationModalRef = this.modalService.show(modal, Object.assign({}, this.modalConfig, { class: 'modal-lg modal-info' }));
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });
  }

  showUploadAssetModal(modal) {
    this.uploadAssetModalRef = this.modalService.show(modal, Object.assign({}, this.modalConfig, { class: 'modal-lg modal-info' }));
  }

  uploadAsset(event) {
    if (JSON.parse(event.xhr.responseText).status === 0) {
      swal({ text: '上传成功', icon: 'success', button: '确认' });
    } else {
      swal({ title: '上传失败', text: JSON.parse(event.xhr.responseText).msg, icon: 'error', button: '确认' });
    }
  }

  downloadAsset() {
    swal({ text: `确认导出下方表格中的${this.total}条数据！`, icon: 'info', buttons: ['取消', '确认'] })
      .then(data => {
        console.log(data);
        if (data) {

        }
      });
  }

  reviewAsset(assetSerialNumber) {
    if (assetSerialNumber) {
      this.assetSearchService.checkAsset({
        assetSerialNumber: assetSerialNumber
      }).then(data => {
        if (data.status === 0) {
          swal({ text: '审核成功', icon: 'success', button: '确认', timer: 2000 });
          this.search();
        } else {
          swal({ title: '审核失败', text: data.msg, icon: 'warning', button: '确认' });
        }
      });
    } else {
      swal({ text: '资产编码为空', icon: 'warning', button: '确认' });
    }
  }

  addFormInit() {
    this.addFormCategory = '';
    this.selectedAddOrg = {
      data: '',
      label: '',
      parent: undefined
    };
    this.expandRecursive(this.addOrganizations[0], false);
    this.addFormEmployee = new Employee();
    this.addForm = new AddAsset();
    this.addForm.useStatus = this.statusTypes[0].assetStatusTypeName;
  }
  // editFormInit() {
  //   this.editFormCategory = '';
  //   this.selectedEditOrg = {
  //     data: '',
  //     label: '',
  //     parent: undefined
  //   };
  //   this.editFormEmployee = new Employee();
  //   this.editForm = new EditAsset();
  //   this.editForm.useStatus = this.statusTypes[0].assetStatusTypeName;
  // }

  addFormCategoryChange(event: AssetCategory) {
    // console.log(event);
    this.addForm.assetCategoryId = event.assetCategoryId || '';
    this.addForm.monthOfDepreciation = event.monthOfDepreciation || this.addForm.monthOfDepreciation || '';
    this.addForm.residualRatio = event.residualRatio || this.addForm.residualRatio || '';
  }

  editFormCategoryChange(event: AssetCategory) {
    // console.log(event);
    this.editForm.assetCategoryId = event.assetCategoryId || '';
    this.editForm.monthOfDepreciation = event.monthOfDepreciation || this.editForm.monthOfDepreciation || '';
    this.editForm.residualRatio = event.residualRatio || this.editForm.residualRatio || '';
  }

  selectSuggestedEmployee(event, type) {
    // console.log(event);
    if (type === 'add') {
      this.addFormEmployee = event;
    } else if (type === 'edit') {
      this.editFormEmployee = event;
    } else if (type === 'search') {
      this.selectedEmployee = event;
    }
  }

  onBlurFromEmployeeSearch(event) {
    if (!this.selectedEmployee.employeeNumber) {
      this.selectedEmployee = new Employee();
    }
  }

  onBlurFromEmployeeAdd(event) {
    if (!this.addFormEmployee.employeeNumber) {
      this.addFormEmployee = new Employee();
    }
  }

  onBlurFromEmployeeEdit(event) {
    if (!this.editFormEmployee.employeeNumber) {
      this.editFormEmployee = new Employee();
    }
  }

  nodeSelect(event, type) {
    // console.log(event);
    if (type === 'add') {
      if (event.node.children) {
        this.selectedAddOrg = {
          data: '',
          label: '',
          parent: undefined
        };
        swal({ text: '请选择子部门', icon: 'warning', button: '确认' });
      } else {
        this.addForm.organizationId = event.node.data;
        this.showAddOrgSelect = false;
      }
    } else if (type === 'edit') {
      if (event.node.children) {
        this.selectedEditOrg = {
          data: '',
          label: '',
          parent: undefined
        };
        swal({ text: '请选择子部门', icon: 'warning', button: '确认' });
      } else {
        this.editForm.organizationId = event.node.data;
        this.showEditOrgSelect = false;
      }
    } else if (type === 'search') {
      this.selectedOrganization = event.node.data;
      this.showSearchOrgSelect = false;
    }
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

  getOrgNodeById(organizationId, data) {
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
