import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

export class CollectionScoreRankModel {}

export interface ICollectionScoreRankSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: CollectionPointScore;
}
