import { AssetCategory } from './../../model/AssetCategory.model';

export class AddAsset {
  assetName?= '';
  brandSpecification?= '';
  majorAssetSerialNumber?= '';
  organizationId?= '';
  assetCategoryId?: string | number = '';
  employeeNumber?= '';
  useStatus?= '';
  batchSerialNumber?= '';
  storageLocation?= '';
  purchaseTime?= '';
  purchaseAmount?= '';
  monthOfDepreciation?= '';
  residualRatio?= '';
}
