import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { VehicleCameraModel } from 'src/app/network/view-model/vehicle-camera.view-model';

export class DeviceListWindowModel<T = any> {
  Id!: string;

  // 车辆名称
  Name!: string;
  // 车辆状态
  State!: string;

  StateStyle: Partial<CSSStyleDeclaration> = {};

  StateCls: string = '';

  DivisionName!: string;

  Type!: string;

  No!: string;

  PlatNo!: string;
  rawData!: T;
}

export interface IDeviceListWindowSearchInfo {
  DivisionId: string;
  PageIndex: number;
  PageSize: number;
  Type: CollectionDeviceStateCountType;
  Condition: string;
}
