import { CollectionScore } from 'src/app/enum/collection-score.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

export class CollectionScoreModel {
  chartData: number[] = [];
}

export interface CollectionScoreSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: CollectionScore;
}
