import { Transform } from 'class-transformer';
import { CameraState } from 'src/app/enum/camera-state.enum';
import { CameraType } from 'src/app/enum/camera-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { CameraAIModel } from './camera-ai.model';
import { ICamera } from './camera.interface';
import { Resource } from './resource.model';
import { transformDateTime } from './transform.model';

/**监控点信息 */
export class AICamera extends Resource implements ICamera {
  /**摄像机类型 */
  CameraType!: CameraType;
  /**摄像机状态 */
  CameraState!: CameraState;
  /**对应设备的通道编号[1-n] */
  ChannelNo!: number;
  /**编码设备ID */
  EncodeDeviceId!: string;
  /**
   * 在线状态(可选)
   */
  OnlineStatus?: OnlineStatus;
  /**伪码，键盘码(可选) */
  KeyBoardCode?: number;
  /**存储路径(可选) */
  StorageLocation?: string;
  /**安装位置(可选) */
  InstallLocation?: string;
  /**是否PTZ可控(可选) */
  PTZControllable?: boolean;
  /**是否可存储的(可选) */
  Storable?: boolean;
  /**最大支持的AI模型数量(可选) * 如果没有该设置，表示不支持AI模型灌入 */
  MaxAIModel?: number;
  /**最近一次的抓图照片地址 */
  ImageUrl?: string;
  /**最近一次的抓图时间 */
  @Transform(transformDateTime)
  ImageTime?: Date;
  /**AI模型列表(可选) */
  AIModels?: CameraAIModel[];
  /**流媒体ID */
  SRSId?: string;
  /**流媒体服务器ID */
  SRServerId?: string;
}
