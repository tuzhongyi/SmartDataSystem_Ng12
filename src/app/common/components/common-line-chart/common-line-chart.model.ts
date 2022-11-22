import { InjectionToken } from '@angular/core';
import {
  LineSeriesOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';
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
  /**x坐标轴信息 */
  xAxis!: XAXisComponentOption;

  /**y坐标轴信息 一般不用配置，留个坑 */
  yAxis?: YAXisComponentOption;

  /**折线图数据 */
  series!: LineSeriesOption[];

  RawData?: T;
}
