export class CollectionVehicleModel<T = any> {
  Id!: string;
  Name!: string;
  PlatNo!: string;
  rawData!: T;
}

export interface ICollectionVehicleSearchInfo {
  DivisionId?: string;
  PageIndex?: number;
  PageSize?: number;
}
