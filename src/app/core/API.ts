const release = '/wenZhouGas/';

const URL = release;
export const API = {
  // 项目地址
  'url': URL,

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

  'signIn': URL + 'sysUserPermissions/login.do',
  'logout': URL + 'sysUserPermissions/logout.do',
  'modifyPassword': URL + 'sysUserPermissions/resetPassword.do',
};
