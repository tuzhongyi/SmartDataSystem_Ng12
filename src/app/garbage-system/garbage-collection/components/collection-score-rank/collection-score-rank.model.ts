import { CollectionScoreEnum } from 'src/app/enum/collection-score.enum';

export class CollectionScoreRankModel {}

export interface ICollectionScoreRankSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: CollectionScoreEnum;
}
