import { InjectionToken } from '@angular/core';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { IModel } from 'src/app/network/model/model.interface';

export const HW_PIE_CHART_TOKEN = new InjectionToken<IModel>('HW_PIE_CHART');

export interface IHWPieCharBusiness<T = any> {
  init(...args: any): Promise<HWPieChartModel<T>> | HWPieChartModel<T>;
}

export class HWPieChartModel<T = any> {
  // 数量详情
  Data!: HWPieChartData[];

  RawData?: T;
}

export class HWPieChartData<T = any> {
  Count!: number;
  Label!: string;
  RawData?: T;
}
