import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

export class CollectionRecordWindowModel<T = any> {
  Id!: string;
  ImageUrl!: string;
  ResourceName!: string;
  VehicleName!: string;
  MemberName!: string;
  DivisionName!: string;
  TrashCanName!: string;
  CollectionPointName!: string;
  Weight!: number;
  Score!: string;
  EventTime!: Date;
  RawData?: T;
}

export interface ICollectionRecordWindowSearchInfo {
  DivisionIds: string[];
  PageIndex: number;
  PageSize: number;
  BeginTime: Date;
  EndTime: Date;
  Condition: string;
  Score: CollectionPointScore | '';
}
