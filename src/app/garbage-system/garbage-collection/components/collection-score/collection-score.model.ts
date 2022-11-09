import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

export class CollectionScoreModel {
  ChartData: number[] = [];
}

export interface CollectionScoreSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: CollectionPointScore;
}
