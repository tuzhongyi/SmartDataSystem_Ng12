import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

export class CollectionStatisticModel {
  ChartData: number[] = [];
}

export interface CollectionStatisticSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: TrashCanType;
}
