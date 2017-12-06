import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'asset-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() set currentPage(value) {
    setTimeout(() => {
      this._currentPage = value;
    }, 0);
  };
  @Input() totalItems; // 总行数
  @Input() itemsPerPage; // 默认分页大小
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>(); // 当前页号变化
  @Output() changeSize: EventEmitter<number> = new EventEmitter<number>(); // 分页大小改变
  pageSizes = [1, 5, 10, 20, 40];
  maxSize = 5; // 显示的分页链接数目
  _currentPage: number; // 当前页号
  constructor() { }

  ngOnInit() {
  }

  pageChanged(event: any) {
    console.log('页号改变，当前页号:' + JSON.stringify(event));
    this.changePage.emit(event);
  }
  sizeChanged(event: any) {
    // this.currentPage = 1;
    setTimeout(() => {
      this.currentPage = 1;
    }, 0);
    console.log('分页大小改变，当前大小:' + JSON.stringify(event));
    console.log('当前页号:::::' + this.currentPage)
    this.itemsPerPage = event;
    this.changeSize.emit(event);
  }
}
