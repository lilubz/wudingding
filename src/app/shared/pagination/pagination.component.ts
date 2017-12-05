import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'asset-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage; // 当前页号
  @Input() totalItems; // 总行数
  @Input() itemsPerPage; // 默认分页大小
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>(); // 当前页号变化
  @Output() changeSize: EventEmitter<number> = new EventEmitter<number>(); // 分页大小改变
  pageSizes = [5, 10, 20, 40];
  maxSize = 5; // 显示的分页链接数目

  constructor() { }

  ngOnInit() {
  }

  pageChanged(event: any) {
    console.log('页号改变，当前页号:' + JSON.stringify(event));
    this.changePage.emit(event);
  }
  sizeChanged(event: any) {
    console.log('分页大小改变，当前大小:' + JSON.stringify(event));
    this.itemsPerPage = event;
    this.changeSize.emit(event);
  }
}
