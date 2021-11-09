import { EChartsOption, SeriesOption } from 'echarts';
import { LineSeriesOption } from 'echarts/charts';
import { EChartsCommon } from './echarts-common.model';

// ECharts 折线图

// 动态数据
export class EChartsLineModel {
  series: LineSeriesOption[] = [];
  seriesLabel: Array<number> = [];
}

// 静态样式
export class EChartsLineOption extends EChartsCommon {
  xAxisInterval: Array<number> = [];
}
