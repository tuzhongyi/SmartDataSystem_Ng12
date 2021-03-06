import { OnlineStatus } from "../enum/online-status.enum";
import { ResourceLabel } from "../network/model/resource-label.model";
import { AIModelManageModel } from "./ai-model-manage.model";
import { CommonModel } from "./common-model";


// 摄像机AI模型列表
export class AICameraModelManageModel implements CommonModel {
  Id!: string;
  Name!: string;
  OnlineStatus!: OnlineStatus;
  AIModels!: AIModelManageModel[];
  Labels!: ResourceLabel[]
}


export enum AICameraModelOperateType {
  delete = 'delete',
  add = 'add'
}
export interface AICameraModelOperateData {
  CameraId: string,
  ModelId: string,
  CameraName: string;// 辅助调试
}
export interface AICameraModelManageEvent {
  type: AICameraModelOperateType
  data: Array<AICameraModelOperateData>
}