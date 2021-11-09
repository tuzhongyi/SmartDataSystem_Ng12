import { RankModel } from '../view-model/rank.model';

export interface RankConverter {
  toRank<T>(data: T[], ...res: any[]): RankModel[];
}
