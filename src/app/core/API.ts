const release = '/wenZhouGas/';

const URL = release;
export const API = {
  // 项目地址
  'url': URL,
  /**
   * 公共接口
   */
  'login': URL + 'sysUserPermissions/login.do',

  'listOrganizationCurrentUser': URL + 'common/listOrganizationCurrentUser.do',
  'listAssetCategory': URL + 'common/listAssetCategory.do',
  'listAssetStatusType': URL + 'common/listAssetStatusType.do',

  'signIn': URL + 'sysUserPermissions/login.do',
  'logout': URL + 'sysUserPermissions/logout.do',
  'modifyPassword': URL + 'sysUserPermissions/resetPassword.do',
};
