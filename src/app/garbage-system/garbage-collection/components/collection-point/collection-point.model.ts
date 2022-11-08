export class CollectionPointModel {
  CollectionPointName!: string;
  Weight!: number;
  EventTime!: Date;
}

export interface CollectionPointSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  PageIndex?: number;
  PageSize?: number;
  CollectionPointName?: string;
}
