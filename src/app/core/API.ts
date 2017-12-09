const release = '/wenZhouGas/';

const URL = release;
export const API = {
  // 项目地址
  'url': URL,
  /**
   * 公共接口
   */
  'login': URL + 'sysUserPermissions/login.do',

  // 资产盘点
  'listInventoryTask': URL + 'assetInfo/StockTaking/listInventoryTask.do',
  'getAssetInfo': URL + 'assetInfo/StockTaking/getAssetInfo.do',
  'listInventoryAsset': URL + 'assetInfo/StockTaking/listInventoryAsset.do',
  'listEndInventoryTask': URL + 'assetInfo/StockTaking/listEndInventoryTask.do',
  'stockTaking': URL + 'assetInfo/StockTaking/updateAssetInfo.do',
  'boolIsInventoryAssetBegin': URL + 'assetInfo/StockTaking/boolIsInventoryAssetBegin.do',
  // 公共接口
  'listAssetStatusType': URL + 'common/listAssetStatusType.do',
  'listAssetCategory': URL + 'common/listAssetCategory.do',
  'listOrganizationCurrentUser': URL + 'common/listOrganizationCurrentUser.do',
  'listEmployeeSimpleCurrentUser': URL + 'common/listEmployeeSimpleCurrentUser.do',
  'listOrganizationChildren': URL + 'common/listOrganizationChildren.do',

  // 资产查询
  'listAssetBasic': URL + 'assetBasic/listAssetBasic.do',
  'addAssetInfo': URL + 'assetBasic/addAssetInfo.do',
  'deleteAssetInfo': URL + 'assetBasic/deleteAssetInfo.do',
  'updateAssetInfo': URL + 'assetBasic/updateAssetInfo.do',
  'getAssetDetailInfo': URL + 'assetBasic/getAssetDetailInfo.do', // 获取资产详细信息
  'listAssetInfoByMajorAsset': URL + 'assetBasic/listAssetInfoByMajorAsset.do', // 根据主资产id获取套资产信息
  'checkAsset': URL + 'assetBasic/checkAsset.do', // 资产审核

  // 资产类别管理
  'addCategory': URL + 'assetBasic/sort/add.do',
  'deleteCategory': URL + 'assetBasic/sort/delete.do',
  'updateCategory': URL + 'assetBasic/sort/update.do',

  'signIn': URL + 'sysUserPermissions/login.do',
  'logout': URL + 'sysUserPermissions/logout.do',
  'modifyPassword': URL + 'sysUserPermissions/resetPassword.do',
  /**
   * 资产统计
   */
  'countAssetNetValue': URL + 'assetCount/countAssetNetValue.do',
  /**
   * 部门管理
   */
  'addDepartment': URL + 'common/departmentController/addDepartment.do',
  'deleteDepartment': URL + 'common/departmentController/deleteDepartment.do',
  'updateDepartment': URL + 'common/departmentController/updateDepartment.do',

};
