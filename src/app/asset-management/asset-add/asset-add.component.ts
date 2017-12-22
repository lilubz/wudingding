import { AssetAddService } from './asset-add.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/primeng';
import { Employee } from 'app/model/Employee.model';
import { AssetCategory } from 'app/model/AssetCategory.model';
import { zh } from './../../core/date-localization';
import * as moment from 'moment';
import { CommonXHRService } from 'app/core/common-xhr.service';
import { AssetStatusType } from 'app/model/AssetStatusType.model';
import { AddAsset } from 'app/asset-management/asset-add/AddAsset.model';
import { API } from 'app/core/api';
import { BsModalRef, BsModalService } from '../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap';

declare const swal: any;
@Component({
  selector: 'asset-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {
  uploadAssetUrl = API.uploadAssetUrl;
  uploadAssetModalRef: BsModalRef;
  modalConfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  zh;
  addForm: AddAsset = new AddAsset();
  addFormCategory: AssetCategory | '' = '';
  addFormEmployee: Employee = new Employee();
  showAddOrgSelect = false;
  selectedAddOrg: TreeNode = {
    data: '',
    label: '',
    parent: undefined
  };
  categories: AssetCategory[];
  statusTypes: AssetStatusType[];
  today = moment().toDate();

  uploadSteps = [
    { label: '模板下载', command: (event: any) => { console.log(event); this.activeUploadStepIndex = 0; } },
    { label: '填写数据', command: (event: any) => { console.log(event); this.activeUploadStepIndex = 1; } },
    { label: '文件上传', command: (event: any) => { console.log(event); this.activeUploadStepIndex = 2; } }
  ];
  activeUploadStepIndex = 0;

  constructor(
    private commonXHRService: CommonXHRService,
    private assetAddService: AssetAddService,
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
        this.addForm.useStatus = this.statusTypes[0].assetStatusTypeName;
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认' });
      }
    });
  }

  addAsset() {
    if (this.checkAddForm()) {
      this.assetAddService.addAssetInfo({
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
          this.addFormInit();
        } else {
          swal({ title: '保存失败', text: data.msg, icon: 'warning', button: '确认' });
        }
      });
    }
  }

  checkAddForm() {
    if (!this.addForm.assetName) {
      swal({ text: '请输入资产名称', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.brandSpecification) {
      swal({ text: '请输入规格', icon: 'warning', button: '确认' });
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
    } else if (!this.addForm.useStatus) {
      swal({ text: '请输入使用状态', icon: 'warning', button: '确认' });
      return false;
      // } else if (!this.addForm.batchSerialNumber) {
      //   swal({ text: '请输入购买批次', icon: 'warning', button: '确认' });
      //   return false;
    } else if (!this.addForm.storageLocation) {
      swal({ text: '请输入存放位置', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.purchaseTime) {
      swal({ text: '请输入购买时间', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.purchaseAmount) {
      swal({ text: '请输入购买金额', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.monthOfDepreciation) {
      swal({ text: '请输入折旧月数', icon: 'warning', button: '确认' });
      return false;
    } else if (!this.addForm.residualRatio) {
      swal({ text: '请输入残值率', icon: 'warning', button: '确认' });
      return false;
    }
    return true
  }

  addFormInit() {
    this.addFormCategory = '';
    this.selectedAddOrg = {
      data: '',
      label: '',
      parent: undefined
    };
    this.addFormEmployee = new Employee();
    this.addForm = new AddAsset();
    this.addForm.useStatus = this.statusTypes[0].assetStatusTypeName;
  }

  selectedOrgChange(event: TreeNode) {
    console.log(event);
    if (event.children) {
      this.selectedAddOrg = {
        data: '',
        label: '',
        parent: undefined
      };
      swal({ text: '该部门还有子部门，您无法选择', icon: 'warning', button: '确认' });
    } else {
      this.selectedAddOrg = event;
    }
  }

  addFormCategoryChange(event: AssetCategory) {
    // console.log(event);
    this.addForm.assetCategoryId = event.assetCategoryId || '';
    this.addForm.monthOfDepreciation = event.monthOfDepreciation || this.addForm.monthOfDepreciation || '';
    this.addForm.residualRatio = event.residualRatio || this.addForm.residualRatio || '';
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
}
