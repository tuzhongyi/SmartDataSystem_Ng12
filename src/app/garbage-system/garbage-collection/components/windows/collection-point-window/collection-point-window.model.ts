export class CollectionPointWindowModel<T = any> {
  Id!: string;

  Name!: string;

  DivisionName!: string;

  Classification!: string;

  Address!: string;

  RawData?: T;
}

export interface ICollectionPointWindowSearchInfo {
  DivisionIds: string[];
  PageIndex: number;
  PageSize: number;
  Condition: string;
}

// Id!: string;

//   // 车辆名称
//   Name!: string;
//   // 车辆状态
//   State!: string;

//   StateStyle: Partial<CSSStyleDeclaration> = {};

//   StateCls: string = '';

//   DivisionName!: string;

//   Type!: string;

//   No!: string;

//   PlatNo!: string;
//   rawData!: T;
