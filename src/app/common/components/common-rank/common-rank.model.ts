import { InjectionToken } from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';

export const COMMON_RANK_TOKEN = new InjectionToken<IModel>('COMMON_RANK');

export interface ICommonRankBusiness<T = any> {
  init(...args: any): Promise<CommonRankModel<T>> | CommonRankModel<T>;
}
export class CommonRankModel<T = any> {
  Data: Array<CommonRankData> = [];
  RawData?: T;
}

export class CommonRankData {
  Id!: string;
  Name!: string;
  Number!: number;
  Unit: string = '';

  RawData?: any;
}
