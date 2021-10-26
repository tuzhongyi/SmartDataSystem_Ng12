/*
 * @Author: pmx
 * @Date: 2021-10-26 09:32:43
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-26 13:58:08
 */

import { XAXisComponentOption, YAXisComponentOption } from 'echarts';
import { LineSeriesOption } from 'echarts/charts';
import {
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components';

let a = [0, 5, 11, 17, 23];
// ECharts 通用配置
export class EChartsCommon {
  constructor() {}

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
    data: [],
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
  grid: GridComponentOption = {
    top: '20%',
    left: 15,
    right: 15,
    bottom: 0,
    containLabel: true,
  };

  // 由于 Axis的类型不同，里面的参数也不同，所以初始化为{}
  xAxis: XAXisComponentOption = {};
  yAxis: YAXisComponentOption = {
    type: 'value',
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: 'rgb(117,134,224,0.3)',
      },
    },
  };
}
