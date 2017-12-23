import { zh } from './../../core/date-localization';
import { Employee } from './../../model/Employee.model';
import { UserStateService } from './../../core/user-state.service';
import { EditAsset } from './EditAsset.model';
import { Asset } from './asset.model';
import { AssetSearchService } from './asset-search.service';
import { Organization } from './../../model/Organization.model';
import { AssetStatusType } from './../../model/AssetStatusType.model';
import { CommonXHRService } from './../../core/common-xhr.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AssetCategory } from 'app/model/AssetCategory.model';
import * as moment from 'moment';
import { ModalDirective, BsModalRef, BsModalService } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/components/common/treenode';
import { API } from 'app/core/api';

declare const swal: any;
@Component({
  selector: 'asset-search',
  templateUrl: './asset-search.component.html',
  styleUrls: ['./asset-search.component.scss']
})
export class AssetSearchComponent implements OnInit {
  assetSearchVisiable = true;
  zh;
  editAssetModalRef: BsModalRef;
  assetDetailModalRef: BsModalRef;
  assetRelationModalRef: BsModalRef;
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

  categories: AssetCategory[];
  statusTypes: AssetStatusType[];
  searchOrganizations: TreeNode[] = [];
  editOrganizations: TreeNode[] = [];
  selectedCategory = '';
  selectedOrganization = '';
  selectedAssetStatus = '';
  searchBeginDate = moment().subtract(7, 'd').toDate();
  searchEndDate = new Date();
  selectedDeleteAsset: Asset;
  selectedEmployee: Employee = new Employee();
  editFormEmployee: Employee = new Employee();

  showSearchOrgSelect = false;
  showEditOrgSelect = false;
  selectedSearchOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  selectedEditOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  selectedEditOrgId;

  editForm: EditAsset | Asset = new EditAsset();
  assetDetail: any = {};
  editFormCategory: AssetCategory | '' = '';
  assetRelationList: any[] = [];

  constructor(
    private commonXHRService: CommonXHRService,
    private assetSearchService: AssetSearchService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.zh = zh;

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

    this.search();
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
        organizationId: this.selectedSearchOrg.data || '',
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

  checkParams() {
    if (!this.searchBeginDate || !this.searchEndDate) {
      swal({ text: '请选择录入时间段', icon: 'warning', button: '确认', });
      return false;
    }
    return true;
  }

  checkEditForm() {
    // if (!this.editForm.assetName) {
    //   swal({ text: '请输入资产名称', icon: 'warning', button: '确认' });
    //   return false;
    // } else
    if (!this.editForm.organizationId) {
      swal({ text: '请输入组织部门', icon: 'warning', button: '确认' });
      return false;
      // } else if (!this.editForm.assetCategoryId) {
      //   swal({ text: '请输入资产类型', icon: 'warning', button: '确认' });
      //   return false;
    } else if (!this.editFormEmployee || !this.editFormEmployee.employeeNumber) {
      swal({ text: '请输入使用人', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editForm.useStatus) {
      swal({ text: '请选择使用状态', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.editForm.storageLocation) {
      swal({ text: '请输入存放位置', icon: 'warning', button: '确认' });
      return false;
      // } else if (!this.editForm.purchaseTime) {
      //   swal({ text: '请输入购买时间', icon: 'warning', button: '确认' });
      //   return false;
      // } else if (!this.editForm.purchaseAmount) {
      //   swal({ text: '请输入购买金额', icon: 'warning', button: '确认' });
      //   return false;
    }
    return true
  }

  pageChanged(event) {
    this.pageNumber = event.page + 1;
    this.pageSize = event.rows;
    this.pageFirst = event.first;
    this.search();
  }

  showReviewModal(asset: Asset) {
    swal({
      title: '确认审核该资产?',
      text: `${asset.assetName}`,
      icon: 'warning',
      buttons: {
        reject: {
          text: '驳回',
          value: false
        },
        confirm: '通过',
      },
      dangerMode: true
    }).then((reviewStatus) => {
      console.log(reviewStatus);
      if (reviewStatus === true || reviewStatus === false) {
        swal({
          content: {
            element: 'input',
            attributes: {
              placeholder: '请输入审核详情',
              type: 'text',
            }
          },
          button: '确认',
        }).then((detail) => {
          console.log(detail);
          if (detail) {
            if (reviewStatus === true) {
              this.reviewAsset(asset.assetSerialNumber, 1, detail);
            } else if (reviewStatus === false) {
              this.reviewAsset(asset.assetSerialNumber, 0, detail);
            }
          }
        });
      }
    });
  }

  showEditModal(asset: any, modal) {
    this.editForm = Object.assign({}, asset);
    this.editFormCategory = '';
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

  downloadAsset() {
    swal({ text: `确认导出下方表格中的${this.total}条数据！`, icon: 'info', buttons: ['取消', '确认'] })
      .then(data => {
        if (data) {
          this.assetSearchService.exportAsset({
            organizationId: this.selectedOrganization || '',
            assetCategoryId: this.selectedCategory,
            useStatus: this.selectedAssetStatus,
            startTimeString: this.searchBeginDate ? moment(this.searchBeginDate).format('YYYY-MM-DD') : '',
            endTimeString: this.searchEndDate ? moment(this.searchEndDate).format('YYYY-MM-DD') : '',
            employeeName: this.selectedEmployee ? this.selectedEmployee.employeeName || '' : '',
          }).then(res => {
            if (res.status === 0) {
              const downloadUrl = API.url + res.data;
              window.location.href = downloadUrl;
              swal({ text: `导出成功！`, icon: 'success', buttons: '确认' });
            } else {
              swal({ text: `${res.msg}`, icon: 'warning', buttons: '确认' });
            }
          })
        }
      });
  }

  reviewAsset(assetSerialNumber, operation, detail?) {
    if (assetSerialNumber) {
      this.assetSearchService.checkAsset({
        assetSerialNumber: assetSerialNumber,
        boolIsPass: operation,
        reviewDetail: detail || ''
      }).then(data => {
        if (data.status === 0) {
          swal({ text: '审核成功', icon: 'success', button: '确认' });
          this.search();
        } else {
          swal({ title: '审核失败', text: data.msg, icon: 'warning', button: '确认' });
        }
      });
    } else {
      swal({ text: '资产编码为空', icon: 'warning', button: '确认' });
    }
  }

  selectedOrgChange(event: TreeNode) {
    console.log(event);
    if (event.children) {
      this.selectedEditOrg = {
        data: '',
        label: '',
        parent: undefined
      };
      swal({ text: '该部门还有子部门，您无法选择', icon: 'warning', button: '确认' });
    } else {
      this.selectedEditOrg = event;
      this.editForm.organizationId = this.selectedEditOrg.data;
    }
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

  editFormCategoryChange(event: AssetCategory) {
    // console.log(event);
    this.editForm.assetCategoryId = event.assetCategoryId || '';
    this.editForm.monthOfDepreciation = event.monthOfDepreciation || this.editForm.monthOfDepreciation || '';
    this.editForm.residualRatio = event.residualRatio || this.editForm.residualRatio || '';
  }
}
