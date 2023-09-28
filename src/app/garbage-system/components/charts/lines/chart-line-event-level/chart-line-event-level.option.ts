import { IChartData } from '../../chart.model';

export interface IChartLineEventLevelData extends IChartData<number[]> {
  index: number;
  name: string;
  value: number[];
}
export interface IChartLineEventLevelDataArray {
  x: string[];
  data: IChartLineEventLevelData[];
}
export interface IChartLineEventLevelModel<
  T extends IChartLineEventLevelDataArray = any
> {
  option: echarts.EChartsOption;
  data: T;
}
// export let ChartPieData: IChartPieData[] = [];
let color = ['#3184e3', '#ffba00', '#ef6464'];
export let ChartPieOption: echarts.EChartsOption = {
  color: color,
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: 40,
    right: 15,
    top: 10,
    bottom: 20,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: '#cfd7ff',
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      name: '一级',
      areaStyle: {},
      data: [],
    },
    {
      type: 'line',
      name: '二级',
      areaStyle: {},
      data: [],
    },
    {
      type: 'line',
      name: '三级',
      areaStyle: {},
      data: [],
    },
  ],
};
