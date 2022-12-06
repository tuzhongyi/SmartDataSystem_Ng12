import { CommonRankModel } from 'src/app/common/components/common-rank/common-rank.model';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

export class CollectionScoreRankModel {
  RankModel!: CommonRankModel;
  RawData?: any;
}

export interface ICollectionScoreRankSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: CollectionPointScore;

  DivisionId: string;
}
