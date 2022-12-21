import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';

export class CollectionVehicleWindowModel<T = any> {
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

export interface ICollectionVehicleWindowSearchInfo {
  DivisionId: string;
  PageIndex: number;
  PageSize: number;
  State: CollectionDeviceStateCountType;
  Condition: string;
  Type: VehicleType | '';
}
