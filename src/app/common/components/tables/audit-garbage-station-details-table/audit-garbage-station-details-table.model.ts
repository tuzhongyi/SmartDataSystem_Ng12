import { EventEmitter } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';

export interface IAuditGarbageStationDetailsTableBusiness
  extends IBusiness<
    PagedList<GarbageStation>,
    PagedList<AuditGarbageStationDetailsTableItem<GarbageStation>>
  > {
  config: IBusiness<AuditGarbageStationDetailsTableConfig>;
  download(
    args: IAuditGarbageStationDetailsTableArgs,
    config: AuditGarbageStationDetailsTableConfig
  ): void;
}
export interface IAuditGarbageStationDetailsTableArgs {
  divisionId?: string;
}

export class AuditGarbageStationDetailsTableArgs
  implements IAuditGarbageStationDetailsTableArgs
{
  divisionId?: string;
  name?: string;
  type?: StationType;
  state?: StationState;
  imei?: string;

  capabilities?: number;

  gchaonline?: boolean;
  dooronline?: boolean;

  nb: {
    state?: number;
    hour: number;
  } = {
    hour: 0,
  };

  accessId?: string;
}
export class AuditGarbageStationDetailsTableItem<
  T = GarbageStation
> extends GarbageStationModel {
  States: StationState[] = [];
  Datas: { [key: string]: AuditGarbageStationDetailsTableItemData<T> } = {};
  Operation = new AuditGarbageStationDetailsTableOperationConfig();
  doorabled = false;
}
export class AuditGarbageStationDetailsTableItemData<T = GarbageStation> {
  constructor(key: string, text: Promise<string>, color?: string) {
    this.key = key;
    this.text = text;
    this.class = color;
  }
  class?: string;
  text: Promise<string>;
  key: string;
  event?: EventEmitter<T>;
}

class ConfigItem {
  constructor(index: number = 0, enabled: boolean = true) {
    this.enabled = enabled;
    this.index = index;
  }
  enabled: boolean;
  index: number;
}
class OperationConfigItem extends ConfigItem {
  show: boolean = true;
}
export class AuditGarbageStationDetailsTableOperationConfig {
  schedule = new OperationConfigItem();
  command = new OperationConfigItem();
  video = new OperationConfigItem();
  device = new OperationConfigItem();
  construction = new OperationConfigItem();
}

export class AuditGarbageStationDetailsTableConfig {
  [key: string]: ConfigItem;
  Community = new ConfigItem();
  Committees = new ConfigItem();
  County = new ConfigItem();
  // City = true;
  StationType = new ConfigItem();
  Address = new ConfigItem();
  StationState = new ConfigItem();
  DropWindows = new ConfigItem();
  Cameras = new ConfigItem();
  TrashCans = new ConfigItem();
  Members = new ConfigItem();
  IMEI = new ConfigItem();
  NBState = new ConfigItem();
  NBHeartbeatTime = new ConfigItem();
  CreateTime = new ConfigItem();
  UpdateTime = new ConfigItem();

  GisPoint = new ConfigItem();

  Device = new ConfigItem();
  GCHA = new ConfigItem();
  CountSchedule = new ConfigItem();
  ChipTemperature = new ConfigItem();

  DumpPointType = new ConfigItem();
  DisableEventTypes = new ConfigItem();
  DeviceAccessId = new ConfigItem();

  DeviceName = new ConfigItem();
  DeviceOnlineState = new ConfigItem();
  DeviceExhaustFan = new ConfigItem();
  DeviceAirPumpPressure = new ConfigItem();
  DeviceAirPumpPower = new ConfigItem();
  DeviceRfidReader = new ConfigItem();
  DeviceGateState = new ConfigItem();
  DeviceSpray = new ConfigItem();
  DeviceGasSensor = new ConfigItem();

  DeviceLastUpdateTime = new ConfigItem();
  DeviceFullCount = new ConfigItem();
  DeviceChipTemperature = new ConfigItem();
}
export const AuditGarbageStationDetailsTableConfigLanguage: {
  [key: keyof AuditGarbageStationDetailsTableConfig]: string;
} = {
  Community: '社区',
  Committees: '居委会',
  County: '街道',

  StationType: '投放点类型',
  Address: '地址',
  StationState: '投放点状态',
  DropWindows: '感应门',
  Cameras: '摄像机',
  TrashCans: '垃圾桶',
  Members: '管理员',
  IMEI: 'IMEI',
  NBState: 'NB电源箱状态',
  NBHeartbeatTime: 'NB电源箱心跳时间',
  CreateTime: '创建时间',
  UpdateTime: '更新时间',

  Device: '智能设备状态',
  GCHA: 'GCHA状态',
  CountSchedule: '计数时间段',
  ChipTemperature: 'CPU温度',
  DumpPointType: '投放点类型',
  DisableEventTypes: '停用事件',
  GisPoint: '坐标',
  DeviceAccessId: '设备接入编号',

  DeviceName: '智能设备名称',
  DeviceOnlineState: '智能设备在线状态',
  DeviceExhaustFan: '排风扇状态',
  DeviceAirPumpPressure: '增压泵压力',
  DeviceAirPumpPower: '增压泵状态',
  DeviceRfidReader: 'RFID读卡器状态',
  DeviceGateState: '大门状态',
  DeviceSpray: '香氛喷洒状态',
  DeviceGasSensor: '气体检测传感器数值',

  DeviceLastUpdateTime: '智能设备最后更新时间',

  DeviceFullCount: '满溢垃圾桶数量',
  DeviceChipTemperature: '智能设备CPU芯片温度',
};
