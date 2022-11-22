import { InjectionToken } from '@angular/core';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { IModel } from 'src/app/network/model/model.interface';

export const COMMON_LINE_CHART_TOKEN = new InjectionToken<IModel>(
  'COMMON_LINE_CHART'
);

export interface ICommonLineCharBusiness<T = any> {
  init(
    ...args: any
  ): Promise<CommonLineChartModel<T>> | CommonLineChartModel<T>;
}

export class CommonLineChartModel<T = any> {
  XData!: Array<string>;

  // 数量详情
  YData!: Array<string | number>;

  RawData?: T;
}

export class CommonLineChartData<T = any> {
  Count!: number;
  Label!: string;
  RawData?: T;
}
