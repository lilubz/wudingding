const release = '/wenZhouGas/';

const URL = release;
export const API = {
  // 项目地址
  'url': URL,
  /**
   * 公共接口
   */
  'login': URL + 'sysUserPermissions/login.do',

  // 公共接口
  'listAssetStatusType': URL + 'common/listAssetStatusType.do',
  'listAssetCategory': URL + 'common/listAssetCategory.do',
  'listOrganizationCurrentUser': URL + 'common/listOrganizationCurrentUser.do',
  'listEmployeeSimpleCurrentUser': URL + 'common/listEmployeeSimpleCurrentUser.do',
  'listOrganizationChildren': URL + 'common/listOrganizationChildren.do',

  // 资产查询
  'listAssetBasic': URL + 'assetBasic/listAssetBasic.do',


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
