export class CollectionPointWeightModel {
  CollectionPointName!: string;
  Weight!: number;
  EventTime!: Date;
}

export interface CollectionPointWeightSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  PageIndex?: number;
  PageSize?: number;
  CollectionPointName?: string;
}
