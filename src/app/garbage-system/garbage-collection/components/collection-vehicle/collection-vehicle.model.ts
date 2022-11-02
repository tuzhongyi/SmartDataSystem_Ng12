export class CollectionVehicleModel {
  VehicleName!: string;
  MemberName!: string;
}

export interface CollectionVehicleSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  PageIndex?: number;
  PageSize?: number;
  VehicleName?: string;
  MemberName?: string;
}
