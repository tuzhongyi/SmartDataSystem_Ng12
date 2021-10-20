import { RankModel } from '../view-model/rank.model';

export interface IRankConverter {
  toRank<T>(data: T[], find?: Function): RankModel[];
}
