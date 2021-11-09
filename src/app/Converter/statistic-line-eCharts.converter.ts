import { EChartsLineModel } from '../view-model/echarts-line.model';

// 数据统计折线图
export interface StatisticLineEChartsConverter {
  toECharts<T>(data: T[], ...res: any[]): EChartsLineModel[];
}
