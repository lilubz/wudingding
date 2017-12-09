import { Component, OnInit } from '@angular/core';
import { AssetStatisticService } from 'app/asset-management/asset-statistic/asset-statistic.service';
import { CommonXHRService } from 'app/core/common-xhr.service';
import { TreeNode } from '../../../../node_modules/_primeng@4.3.0@primeng/components/common/treenode';
import { UserStateService } from 'app/core/user-state.service';


declare const swal: any;
@Component({
  selector: 'asset-statistic',
  templateUrl: './asset-statistic.component.html',
  styleUrls: ['./asset-statistic.component.scss']
})
export class AssetStatisticComponent implements OnInit {
  assetStatisticList = [];

  Dropdown = {
    default: {
      value: '',
      label: '请选择'
    },
    assetType: [],
    organizationList: [],
    inventoryList: [
      {
        value: '',
        label: '请选择'
      },
      {
        value: '0',
        label: '未盘点'
      },
      {
        value: '1',
        label: '已盘点'
      },
    ],
    assetStatus: [],
  }

  searchParams = {
    assetCategoryId: '',
    organizationId: '',
    inventoryStatus: '',
    assetStatusTypeId: '',
    pageSize: 1,
    pageNumber: 10,
  }
  theads = [
    // '统计',
    '组织id',
    '组织名称',
    '资产原值总额(元)',
    '资产残值总额(元)',
    '资产每期折旧总额(元)',
    '资产折旧总额(元)',
    '资产净值(元)'
  ];
  filesTree: TreeNode[] = []
  selectedNode: TreeNode;
  Childern: any;
  originalValueSum = 0;
  depreciationAmountAccumulateSum = 0;
  depreciationAmountMonthlySum = 0;
  netValueSum = 0;
  residualValueSum = 0;

  constructor(private _service: AssetStatisticService,
    private commonXHRService: CommonXHRService,
    private userStateService: UserStateService) {

  }
  ngOnInit() {
    this.getTreeNode();
  }

  /**
   * 节点变化
   * @param event
   */
  nodeSelect(event) {
    this.searchStatistic(event.node);
  }
  loadNode(event) {
    this.searchStatistic(event.node);
  }
  getTreeNode() {
    const user = this.userStateService.getUser();
    this.commonXHRService.getTreeNodde({ organizationId: user.organizationId }).then(data => {
      if (data.status === 0) {
        console.log(data.data);
        this.filesTree = [this.transformOrgToTreeNode(data.data)];
        console.log(this.filesTree);
      } else {

      }
    }).catch(error => {

    })
  }

  /**
   * 统计信息
   */
  searchStatistic(param) {
    const params = {
      organizationId: param.data || '',
    }
    this._service.getCountAssetNetValue(params)
      .then(data => {
        if (data.status === 0) {
          this.assetStatisticList = data.data;
          this.assetStatisticList.forEach(value => {
            this.originalValueSum += Number(value.originalValue);
            this.depreciationAmountAccumulateSum += Number(value.depreciationAmountAccumulate);
            this.depreciationAmountMonthlySum += Number(value.depreciationAmountMonthly);
            this.residualValueSum += Number(value.residualValue);
            this.netValueSum += Number(value.netValue);
          })
        } else {
          swal({
            title: '',
            text: '查询失败',
            icon: 'warning',
            button: '确认',
          });
        }
      }).catch(error => {
        swal({
          title: '响应异常',
          text: error,
          icon: 'error',
          button: '确认',
        });
      })
    this.sumInit();

  }
  /**
   * 遍历树
   * @param data
   */
  transformOrgToTreeNode(data) {
    if (data) {
      const temp = {
        collapsedIcon: 'fa-folder',
        data: data.t.organizationId,
        expandedIcon: 'fa-folder-open',
        label: data.t.name,
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
  /**
   * 初始化总数
   */
  sumInit() {
    this.originalValueSum = 0;
    this.depreciationAmountAccumulateSum = 0;
    this.depreciationAmountMonthlySum = 0;
    this.residualValueSum = 0;
    this.netValueSum = 0;
  }
}
