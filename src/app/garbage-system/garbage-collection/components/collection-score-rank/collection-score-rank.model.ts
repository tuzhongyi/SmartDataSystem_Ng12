import {
  CommonRankData,
  CommonRankModel,
} from 'src/app/common/components/common-rank/common-rank.model';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

export class CollectionScoreRankModel {
  RankModel!: CommonRankModel;
  RawData?: any;
}

export interface ICollectionScoreRankSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type?: CollectionPointScore;
  DivisionIds: string[];
}

export class CollectionScoreRankArgs {
  model!: CommonRankData;
  score?: CollectionPointScore;
}
