import { CameraDeviceType } from 'src/app/enum/device-type.enum';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { ResourceLabel } from '../../../network/model/garbage-station/resource-label.model';

// 摄像机列表
export class CameraManageModel<T = any> {
  Id!: string;
  Name!: string;
  OnlineStatus!: OnlineStatus;
  AIModels!: CameraAIModelManageModel[];
  Labels!: ResourceLabel[];

  RawData?: T;
}

export class CameraAIModelManageModel<T = any> {
  Id!: string;
  Name!: string;
  LabelIcon!: string;

  RawData?: T;
}
export enum AICameraModelOperateType {
  delete = 'delete',
  add = 'add',
}
export interface AICameraModelOperateData {
  camera: IIdNameModel;
  model: IIdNameModel;
}
export interface AICameraModelManageEventArgs {
  type: AICameraModelOperateType;
  data: Array<AICameraModelOperateData>;
}

export interface AICameraModelManageSearchInfo {
  ModelName: string;
  CameraDeviceType: CameraDeviceType | '';

  PageIndex?: number;
  PageSize?: number;
  LabelIds: Array<string>;
  CameraName: string;
}
