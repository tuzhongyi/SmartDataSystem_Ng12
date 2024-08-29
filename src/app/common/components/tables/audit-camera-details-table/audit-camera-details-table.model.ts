import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { CameraClassification } from 'src/app/enum/camera-classification.enum';
import { CameraEncodeType } from 'src/app/enum/camera-type.enum';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CameraModel } from 'src/app/view-model/camera-model';

export interface IAuditCameraDetailsTableBusiness
  extends IBusiness<PagedList<Camera>, PagedList<AuditCameraDetailsTableItem>> {
  config: IBusiness<AuditCameraDetailsTableConfig>;
  download(
    args: IAuditCameraDetailsTableArgs,
    config: AuditCameraDetailsTableConfig
  ): void;
}
export interface IAuditCameraDetailsTableArgs {
  divisionId?: string;
}

export class AuditCameraDetailsTableArgs
  implements IAuditCameraDetailsTableArgs
{
  divisionId?: string;
  name?: string;
  usage?: CameraUsage;
  type?: CameraEncodeType;
  classification?: CameraClassification;
  status: {
    OnlineStatus?: OnlineStatus;
    SceneChange?: number;
    ImageQuality?: number;
    Brightness?: number;
    Aberration?: number;
    Disturbance?: number;
    RecordState?: number;
  } = {};
}
export class AuditCameraDetailsTableItem extends CameraModel {
  Usages: CameraUsage[] = [];
  Datas: { [key: string]: AuditCameraDetailsTableItemData } = {};
}
export class AuditCameraDetailsTableItemData {
  constructor(key: string, text: Promise<string>, color?: string) {
    this.key = key;
    this.text = text;
    this.class = color;
  }
  class?: string;
  text: Promise<string>;
  key: string;
}

class ConfigItem {
  constructor(index: number = 0, enabled: boolean = true) {
    this.enabled = enabled;
    this.index = index;
  }
  enabled: boolean;
  index: number;
}

export class AuditCameraDetailsTableConfig {
  [key: string]: ConfigItem;
  GarbageStation = new ConfigItem();
  CameraUsage = new ConfigItem();
  CreateTime = new ConfigItem();
  UpdateTime = new ConfigItem();
  PositionNo = new ConfigItem();
  IsFull = new ConfigItem();
  GarbageFullTime = new ConfigItem();
  SceneChange = new ConfigItem();
  ImageQuality = new ConfigItem();
  Brightness = new ConfigItem();
  Aberration = new ConfigItem();
  Disturbance = new ConfigItem();
  OnlineStatus = new ConfigItem();
  OfflineTime = new ConfigItem();
  CameraType = new ConfigItem();
  Classification = new ConfigItem();
  RecordState = new ConfigItem();
  AbnormalTime = new ConfigItem();
}
export const AuditCameraDetailsTableConfigLanguage: {
  [key: keyof AuditCameraDetailsTableConfig]: string;
} = {
  Name: '摄像机名称',
  CameraUsage: '摄像机用途',
  CreateTime: '创建时间',
  UpdateTime: '更新事件',
  GarbageStation: '垃圾厢房',
  PositionNo: '位置',
  GarbageFullTime: '垃圾满溢时间',
  IsFull: '是否满溢',
  OnlineStatus: '在线状态',
  SceneChange: '场景变换',
  ImageQuality: '清晰度',
  Brightness: '视频亮度',
  Aberration: '色差/偏色',
  Disturbance: '视频干扰',
  CameraType: '摄像机类型',
  Classification: '摄像机分类',
  EncodeDeviceId: '编码设备ID',
  RecordState: '录像状态',
  AbnormalTime: '故障时间',
  OfflineTime: '离线时间',
};
