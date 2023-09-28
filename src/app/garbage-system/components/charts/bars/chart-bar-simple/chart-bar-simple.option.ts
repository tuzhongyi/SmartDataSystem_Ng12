export interface IChartBarData {
  name: string;
  value: number[];
}
export interface IChartBarModel<T extends IChartBarData = any> {
  option: echarts.EChartsOption;
  x: string[];
  data: T;
}
let color = ['#3184e3'];
export let ChartPieOption: echarts.EChartsOption = {
  color: color,
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: 50,
    right: 15,
    top: 20,
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
    offset: 10, // 坐标轴和坐标轴之间的距离
    splitLine: {
      lineStyle: {
        color: '#3184e3',
        opacity: 0.2,
      },
    },
  },
  series: [
    {
      type: 'bar',
      name: '',
      data: [],
      label: {
        show: true,
        color: 'white',
        position: 'top',
      },
    },
  ],
};
