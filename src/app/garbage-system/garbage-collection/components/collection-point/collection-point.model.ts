export class CollectionPointModel {
  CollectionPointName!: string;
  Weight!: number;
  EventTime!: string;
}

export interface CollectionPointSearchInfo {
  BeginTime: Date;
  EndTime: Date;

  PageIndex?: number;
  PageSize?: number;
  CollectionPointName?: string;
}
