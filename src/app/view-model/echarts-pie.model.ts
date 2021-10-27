import { PieSeriesOption } from 'echarts';
import { EChartsCommon } from './echarts-common.model';

// 动态数据
export class EChartsLineModel {
  series: PieSeriesOption[] = [];
}
// 静态样式
export class EChartsPieOption extends EChartsCommon {}
