import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

export class CollectionScoreRankModel {
  Id!: string;
  Name!: string;
  Number!: number;
  Unit: string = '起';
}

export interface ICollectionScoreRankSearchInfo {
  BeginTime: Date;
  EndTime: Date;
  Type: CollectionPointScore;
  DivisionIds: string[];
}
