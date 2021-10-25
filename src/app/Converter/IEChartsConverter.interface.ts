import { EChartsLineModel } from '../view-model/echarts.model';

export interface IEChartsConverter {
  toECharts<T>(data: T[], ...res: any[]): EChartsLineModel;
}
