import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';

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
  TrashCanType?: TrashCanType;
  TagStyle: Partial<CSSStyleDeclaration> = {};
  TagCls: string = '';

  Cameras!: VehicleCamera[];

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
  Score?: CollectionPointScore;
  type?: TrashCanType;
  asc?: string;
  desc?: string;
}
