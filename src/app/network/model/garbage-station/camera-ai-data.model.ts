import { CameraAIDataObject } from './camera-ai-data-object.model';
import { Resolution } from './resolution';

/** 摄像机AI数据 */
export class CameraAIData {
  /**
   * 识别成功的目标列表
   */
  Objects!: CameraAIDataObject[];
  /** 图片分辨率(可选) */
  Resolution?: Resolution;
  /**图片ID,图片地址 */
  ImageUrl?: string;
  /**数据上报时间 */
  Time!: Date | string;
  /**模型数据ID */
  ModelId?: string;
  /**模型名称 */
  ModelName?: string;
}
