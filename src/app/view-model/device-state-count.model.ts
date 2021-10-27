import { DeviceStateCountType } from '../enum/device-state-count.enum';

// 设备数量接口
export interface IDeviceStateDes {
  //标题
  label: string;
  // 数量
  count: number;

  tag: DeviceStateCountType;
}
export class DeviceStateCountModule {
  onLinePercentage: string = '0';
  deviceStateArr: Array<IDeviceStateDes> = [];
  unit: string = '%';
  constructor() {}
}
