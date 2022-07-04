import { OnlineStatus } from "../enum/online-status.enum";
import { AIModelManageModel } from "./ai-model-manage.model";


// 摄像机AI模型列表
export class AICameraModelManageModel {
  CameraId!: string;
  CameraName!: string;
  OnlineStatus!: OnlineStatus;
  AIModels!: AIModelManageModel[];
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