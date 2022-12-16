export class CollectionWeightWindowModel<T = any> {
  Id!: string;
  ResourceName!: string;
  VehicleName!: string;
  MemberName!: string;
  DivisionName!: string;
  TrashCanName!: string;
  CollectionPointName!: string;
  Weight!: number;
  Score!: string;
  RawData?: T;
}

export interface ICollectionWeightWindowSearchInfo {
  DivisionIds: string[];
  PageIndex: number;
  PageSize: number;
  BeginTime: Date;
  EndTime: Date;
  Condition: string;
}
