import {
  GridComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  TitleComponentOption,
} from 'echarts/components';
interface IEChartsData {}
interface IEChartOptions {
  title: TitleComponentOption;
  xAxisInterval: Array<number>;
  legend: LegendComponentOption;
  tooltip: TooltipComponentOption;
  grid: GridComponentOption;
}

// 动态数据
export class EChartsLineModel {
  seriesData: Array<number> = [];
  xAxisData: Array<string> = [];
}

// 静态样式
export class LineOption implements IEChartOptions {
  title: TitleComponentOption = {
    text: '',
    textStyle: {
      color: '#fff',
      fontSize: '24px',
      fontFamily: 'Source Han Sans CN Normal',
      fontWeight: 400,
      overflow: 'truncate',
    },
  };
  legend: LegendComponentOption = {
    top: '12px',
    right: '0px',
    icon: 'none',
    data: ['单位(起)'],
    textStyle: {
      color: '#7a8de6',
      fontSize: '12px',
    },
  };
  tooltip: TooltipComponentOption = {
    mainType: 'tooltip',
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        show: true,
      },
    },
  };
  grid = {
    top: '20%',
    left: 15,
    right: 15,
    bottom: 0,
    containLabel: true,
  };

  xAxisInterval: Array<number> = [];
}

new LineOption().tooltip;
