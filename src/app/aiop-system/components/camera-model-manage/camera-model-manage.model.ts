import { AIModelTransformType } from 'src/app/enum/transform-type.enum';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { ResourceLabel } from '../../../network/model/resource-label.model';
import { AIModelManageModel } from '../../../view-model/ai-model-manage.model';
import { CommonModel } from '../../../view-model/common-model';

// 摄像机AI模型列表
export class AICameraModelManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  OnlineStatus!: OnlineStatus;
  AIModels!: AIModelManageModel[];
  Labels!: ResourceLabel[];
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
  TransformType: AIModelTransformType | '';

  PageIndex?: number;
  PageSize?: number;
  LabelIds: Array<string>;
  CameraName: string;
}
