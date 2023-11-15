import { CameraType } from 'src/app/enums/camera-type.enum';
import { ResourceType } from 'src/app/enums/resource-type.enum';

export class RegionNodeMatchModel {}

export class RegionNodeResourceModel {
  Id!: string;
  Name!: string;
  ResourceType!: ResourceType;
  DetailType!: CameraType;
  DetailTypeName!: string;
  DetailIcon!: string;
}

export interface RegionNodeMatchSearch {
  Name: string;
}
