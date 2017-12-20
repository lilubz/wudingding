import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { zh } from './../../../core/date-localization';
import * as moment from 'moment';
import { TaskService } from './task.service'
declare const swal: any;
@Component({
  selector: 'asset-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  currentTime = new Date();
  buttonShow = {
    enter: false,
    edit: false,
    del: false,
    end: false
  }
  searchBeginDate: any;
  zh = zh;
  modalRef: BsModalRef;
  config = {
    // 盘点状态码，和下面的数组索引是一一对应关系，
    buttonShow: [
      {
        enter: true,
        edit: true,
        del: true,
        end: true
      },
      {
        enter: false,
        edit: true,
        del: true,
        end: false
      },
      {
        enter: true,
        edit: false,
        del: false,
        end: true
      },
      {
        enter: true,
        edit: false,
        del: true,
        end: false
      },
      {
        enter: true,
        edit: false,
        del: true,
        end: false
      }
    ]
  }
  searchParams: any = {
    startTime: moment().subtract(30, 'days')['_d'],
    endTime: moment().add(1, 'days')['_d'],
    organizationId: '13', // 13表示【综合部】ID
    status: '2' // 2表示【正在盘点】ID
  }
  pageParams = {
    startTime: moment().subtract(30, 'days')['_d'],
    endTime: moment()['_d'],
    organizationId: '13',
    status: '2'
  }
  taskParams = {
    start: '',
    end: '',
    department: ''
  }
  table = {
    list: [],
    options: [5, 10, 20, 40],
    first: 0,
    size: 10,
    total: 0,
    status: '2'
  }
  editParams: any = {
    startTime: '',
    endTime: '',
    organizationId: '',
    assetInventoryTaskId: ''
  }
  addParams: any = {
    startTime: moment()['_d'],
    endTime: moment().add(7, 'days')['_d'],
    organizationId: '13', // 13表示综合部ID
  }
  constructor(private modalService: BsModalService, private _service: TaskService) { }

  ngOnInit() {
    this.onSearch();
  }

  // 数据展示
  onSearch() {
    this.table.first = 0;
    this.pageParams = Object.assign({}, {
      startTime: this.searchParams.startTime === '' ? '' : moment(this.searchParams.startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: this.searchParams.endTime === '' ? '' : moment(this.searchParams.endTime).format('YYYY-MM-DD HH:mm:ss'),
      organizationId: this.searchParams.organizationId,
      status: this.searchParams.status
    });
    this.getTableList(Object.assign({
      pageNumber: 1,
      pageSize: this.table.size,
    }, this.pageParams))
  }
  onPageChange(event) {
    this.table.size = event.rows;
    this.table.first = event.first;
    this.getTableList(Object.assign({
      pageSize: this.table.size,
      pageNumber: event.page + 1,
    }, this.pageParams));
  }

  // 编辑盘点任务
  onEditTask(item, template) {
    this.editParams = {
      startTime: moment(item.startTime)['_d'],
      endTime: moment(item.endTime)['_d'],
      organizationId: item.organizationName === '综合部' ? '13' : '15',
      assetInventoryTaskId: item.assetInventoryTaskId,
    }
    this.modalRef = this.modalService.show(template);
  }
  onCancelEdit() {
    this.modalRef.hide();
  }
  onSendEdit() {
    this.sendEdit(Object.assign({}, this.editParams, {
      startTime: moment(this.editParams.startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(this.editParams.endTime).format('YYYY-MM-DD HH:mm:ss'),
    }));
  }

  // 添加盘点任务
  onAddTask(template) {
    this.modalRef = this.modalService.show(template);
  }
  onCancelAdd() {
    this.modalRef.hide();
  }
  onSendAdd() {
    if (this.addParams.startTime === ''
      || this.addParams.endTime === ''
      || this.addParams.organizationId === '') {
      swal('不能输入空值！', {
        icon: 'warning',
      });
      return;
    }
    this.sendAdd({
      startTime: moment(this.addParams.startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(this.addParams.endTime).format('YYYY-MM-DD HH:mm:ss'),
      organizationId: this.addParams.organizationId,
    })
  }

  // 删除盘点任务 与 结束盘点任务
  onDeleteTask(id) {
    swal({
      title: '确定删除吗？',
      text: '你将无法恢复该盘点任务！',
      icon: 'warning',
      buttons: ['取消', '确定删除'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.sendDelete({
            assetInventoryTaskId: id,
          });
        } else {
        }
      });
  }
  onEndTask(id) {
    swal({
      title: '请确定！',
      text: '请检查是否还存在未盘点的资产！',
      icon: 'warning',
      buttons: ['取消', '结束盘点'],
      dangerMode: true,
    })
      .then((result) => {
        if (result) {
          this.sendEnd({
            assetInventoryTaskId: id,
          });
        }
      });
  }

  // http 请求
  getTableList(params?) {
    this._service.listTask(params)
      .then(data => {
        if (data.status === 0) {
          this.table.list = data.data.list;
          this.table.total = data.data.total;
          this.table.status = this.pageParams.status;
          this.buttonShow = this.config.buttonShow[this.pageParams.status];
        } else {
          this.table.list = [];
          this.table.total = 0;
          this.table.first = 0;
          swal(data.msg, {
            icon: 'warning',
          });
        }
      }).catch(error => {
        this.table.list = [];
        this.table.total = 0;
        this.table.first = 0;
        swal('出错了,错误代码：' + error.status, {
          icon: 'error',
        });
      });
  }
  sendAdd(params) {
    console.log(params);
    this._service.addInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.modalRef.hide();
          this.onSearch();
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
  sendEdit(params) {
    this._service.updateInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.modalRef.hide();
          this.onSearch();
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
  sendDelete(params) {
    this._service.deleteInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.onSearch();
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
  sendEnd(params) {
    this._service.listEndInventoryTask(params)
      .then(data => {
        if (data.status === 0) {
          swal(data.msg, {
            icon: 'success',
          });
          this.onSearch();
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
