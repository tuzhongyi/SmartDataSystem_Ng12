import { EChartsLineModel } from '../view-model/echarts-line.model';

export interface IEChartsConverter {
  toECharts<T>(data: T[], ...res: any[]): EChartsLineModel;
}
