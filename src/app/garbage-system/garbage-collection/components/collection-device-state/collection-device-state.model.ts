import { OnlineStatus } from "src/app/enum/online-status.enum";





// 设备数量接口
export interface IDeviceStateDes {
  //标题
  label: string;
  // 数量
  count: number;
  status?: OnlineStatus;
  tagCls: string;
}
export class CollectionDeviceStateModel {
  onLineRatio: number = 0;
  state: DeviceStateRatioType = DeviceStateRatioType.good;
  stateCls: string = '';
  stateDes: string = '';
  deviceStateArr: Array<IDeviceStateDes> = [];
  unit: string = '%';
  constructor() { }
}
