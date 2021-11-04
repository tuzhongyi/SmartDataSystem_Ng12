import {
  DeviceStateCountType,
  DeviceStateRatioType,
} from '../enum/device_state_count.enum';

// 设备数量接口
export interface IDeviceStateDes {
  //标题
  label: string;
  // 数量
  count: number;

  tagCls: string;
}
export class DeviceStateCountModule {
  onLineRatio: number = 0;
  state: DeviceStateRatioType = DeviceStateRatioType.good;
  stateCls: string = '';
  stateDes: string = '';
  deviceStateArr: Array<IDeviceStateDes> = [];
  unit: string = '%';
  constructor() {}
}
