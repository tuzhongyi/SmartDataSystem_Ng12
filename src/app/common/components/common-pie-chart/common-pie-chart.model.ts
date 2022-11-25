import { InjectionToken } from '@angular/core';
import { EChartsOption, PieSeriesOption } from 'echarts';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { IModel } from 'src/app/network/model/model.interface';

export const COMMON_PIE_CHART_TOKEN = new InjectionToken<IModel>(
  'COMMON_PIE_CHART'
);

export interface ICommonPieCharBusiness<T = any> {
  init(...args: any): Promise<CommonPieChartModel<T>> | CommonPieChartModel<T>;
}

export class CommonPieChartModel<T = any> {
  /* 数量详情 */
  Merge!: EChartsOption;

  RawData?: T;
}

export class CommonPieChartData<T = any> {
  Count!: number;
  Label!: string;
  RawData?: T;
}
