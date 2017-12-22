export class SystemMessage {
  sysMessageId: string;
  assetName: string;
  verifyUserName: string;
  operation: string;
  detail: string;
  boolIsOperationPass: string;
  operationDetail: OperationDetail[];
  createTime: string;
}

class OperationDetail {
  organizationName: string;
  organizationNumber: string;
  employeeName: string;
  employeeNumber: string;
  useStatus: string;
  storageLocation: string;
}
