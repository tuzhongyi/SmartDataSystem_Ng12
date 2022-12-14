export class CollectionListWindowModel {
  Id!: string;
  CollectionPointName!: string;
  VehicleName!: string;
  DivisionName!: string;
  MemberName!: string;
  TrashCanName!: string;

  RawData?: any;
}

export interface ICollectionListWindowSearchInfo {
  PageIndex: number;
  PageSize: number;
  BeginTime: Date;
  EndTime: Date;
  Condition: string;
  CollectionPointIds: string[];
}
