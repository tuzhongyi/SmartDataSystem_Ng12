import { ResourceLabel } from '../network/model/garbage-station/resource-label.model';
import { CommonModel } from './common-model';

export class AICameraManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  CameraType!: string;
  CameraState!: string;
  DeciveName!: string;
  Labels!: ResourceLabel[];
}

export interface AICameraManageSearchInfo {
  Condition: string;
  CameraName: string;
  CameraType: string;
  DeviceId: string;
  LabelIds: string[];
  Filter: boolean;
}
