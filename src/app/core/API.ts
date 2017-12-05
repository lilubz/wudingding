const release = '/wenZhouGas/';

const URL = release;
export const API = {
  // 项目地址
  'url': URL,

  // 用户接口
  'login': URL + 'sysUserPermissions/login.do',

  // 资产盘点
  'listInventoryTask': URL + 'assetInfo/StockTaking/listInventoryTask.do',
  'getAssetInfo': URL + 'assetInfo/StockTaking/getAssetInfo.do',
  'listInventoryAsset': URL + 'assetInfo/StockTaking/listInventoryAsset.do',
  'listEndInventoryTask': URL + 'assetInfo/StockTaking/listEndInventoryTask.do',
  'updateAssetInfo': URL + 'assetInfo/StockTaking/updateAssetInfo.do',
  'boolIsInventoryAssetBegin': URL + 'assetInfo/StockTaking/boolIsInventoryAssetBegin.do',
};
