import { VehicleType } from 'src/app/enum/vehicle-type.enum';

export class CollectionVehicleModel<T = any> {
  Id!: string;
  Name!: string;
  Type!: VehicleType;
  rawData!: T;
}

export interface ICollectionVehicleSearchInfo {
  DivisionId?: string;
  PageIndex?: number;
  PageSize?: number;
}
