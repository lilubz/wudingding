
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from '../../../../../node_modules/_ngx-bootstrap@1.9.3@ngx-bootstrap';
import { AssetDetailService } from 'app/asset-management/asset-search/asset-detail/asset-detail.service';

declare const swal: any;
@Component({
  selector: 'asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  @Input() assetDetail;
  @Input() detailModalRef;

  historyPageNumber = 1;
  historyPageSize = 10;
  historyTotal = 0;

  assetHistoryModalRef: BsModalRef;
  modalConfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false
  };

  assetChangeHistoryList: any[] = [];
  constructor(
    private modalService: BsModalService,
    private assetDetailService: AssetDetailService
  ) { }

  ngOnInit() {
  }

  showAssetHistoryModal(assetId, modal) {
    this.detailModalRef.hide();
    this.assetHistoryModalRef = this.modalService.show(modal, Object.assign({}, this.modalConfig, { class: 'modal-lg modal-primary' }));
    this.listHistory();
  }

  listHistory(): Promise<any> {
    return this.assetDetailService.listAssetChangeHistory({
      pageNumber: this.historyPageNumber,
      pageSize: this.historyPageSize,
      assetId: '6' || this.assetDetail.assetId
    }).then(data => {
      if (data.status === 0) {
        this.assetChangeHistoryList = data.data.list.map((value, index, arr) => {
          value.detail = JSON.parse(value.detail);
          return value;
        });
        this.historyTotal = data.data.total;
      } else {
        this.assetChangeHistoryList = [];
        this.historyTotal = 0;
        swal({ text: data.msg, icon: 'warning', button: '确定' });
      }
    })
  }

  pageChanged(event) {
    this.historyPageNumber = event.page + 1;
    this.historyPageSize = event.rows;
    this.listHistory();
  }
}
