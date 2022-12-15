import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';

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
  Type: CollectionDeviceStateCountType;
  Condition: string;
}
