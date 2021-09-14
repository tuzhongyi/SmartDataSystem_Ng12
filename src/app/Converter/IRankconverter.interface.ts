import { RankModel } from '../model/rank.model';

export interface IRankConverter {
  toRank(data: any): RankModel;
}
