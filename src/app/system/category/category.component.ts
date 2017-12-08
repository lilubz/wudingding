import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { CategoryService } from './category.service';
declare const swal: any;

@Component({
  selector: 'asset-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  categoryList = [];
  activeCategory = {
    assetCategoryId: 1,
    categoryName: '',
    detail: '',
    monthOfDepreciation: ''
  };
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  seeDetails(template) {
    this.modalRef = this.modalService.show(template);
  }

  onSelectCategory(category, template) {
    this.activeCategory = Object.assign({}, category);
    this.modalRef = this.modalService.show(template);
  }

  onAdd(name, detail, depreciation) {
    if (name === '' || detail === '' || depreciation === '') {
      swal('不能输入空值!', {
        icon: 'warning',
      });
      return;
    } else {
      this.sendAdd({
        categoryName: name,
        detail: detail,
        monthOfDepreciation: depreciation
      });
    }
  }

  onDelete() {
    this.sendDelete({
      assetCategoryId: this.activeCategory.assetCategoryId
    });
  }

  onUpdate() {
    if (this.activeCategory.categoryName === ''
    || this.activeCategory.detail === ''
    || this.activeCategory.monthOfDepreciation === '') {
      swal('不能输入空值!', {
        icon: 'warning',
      });
      return;
    } else {
      this.sendUpdate(this.activeCategory);
    }
  }

  getCategoryList(params?) {
    this.categoryService.listAssetCategory(params)
      .then(data => {
        if (data.status === 0) {
          this.categoryList = data.data;
        } else {
          this.categoryList = [];
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.categoryList = [];
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  sendAdd(params?) {
    this.categoryService.addCategory(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.getCategoryList();
          this.modalRef.hide();
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  sendDelete(params?) {
    this.categoryService.deleteCategory(params)
      .then(data => {
        if (data.status === 0) {
          this.getCategoryList();
          this.modalRef.hide();
          swal(data.msg, {
            icon: 'success',
          });
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }

  sendUpdate(params?) {
    this.categoryService.updateCategory(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.getCategoryList();
          this.modalRef.hide();
        } else {
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }
}
