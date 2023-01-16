import { CameraDeviceType } from 'src/app/enum/device-type.enum';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { ResourceLabel } from '../../../network/model/resource-label.model';
import { CommonModel } from '../../../view-model/common-model';

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
  CameraId: string;
  ModelId: string;
  CameraName: string; // 辅助调试
}
export interface AICameraModelManageEvent {
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
