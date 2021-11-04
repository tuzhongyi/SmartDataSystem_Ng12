import { EChartsLineModel } from '../view-model/echarts_line.model';

// 数据统计折线图
export interface IStatisticLineEChartsConverter {
  toECharts<T>(data: T[], ...res: any[]): EChartsLineModel[];
}
