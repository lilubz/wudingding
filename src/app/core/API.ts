const release = '/wenZhouGas/';

const URL = release;
export const API = {
  // 项目地址
  'url': URL,

  // 资产盘点
  'listInventoryTask': URL + 'assetInfo/StockTaking/listInventoryTask.do',
  'getAssetInfo': URL + 'assetInfo/StockTaking/getAssetInfo.do',
  'listInventoryAsset': URL + 'assetInfo/StockTaking/listInventoryAsset.do',
  'listEndInventoryTask': URL + 'assetInfo/StockTaking/listEndInventoryTask.do',
  'updateAssetInfo': URL + 'assetInfo/StockTaking/updateAssetInfo.do',
  'boolIsInventoryAssetBegin': URL + 'assetInfo/StockTaking/boolIsInventoryAssetBegin.do',
  // 公共接口
  'listAssetStatusType': URL + 'common/listAssetStatusType.do',
  'listAssetCategory': URL + 'common/listAssetCategory.do',
  'listOrganizationCurrentUser': URL + 'common/listOrganizationCurrentUser.do',



  'signIn': URL + 'sysUserPermissions/login.do',
  'logout': URL + 'sysUserPermissions/logout.do',
  'modifyPassword': URL + 'sysUserPermissions/resetPassword.do',
};
