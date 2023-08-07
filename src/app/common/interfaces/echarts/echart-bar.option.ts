import * as echarts from 'echarts/core';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';

export var EchartBarOption = {
  color: ['#7586e0', '#ffba00', '#21E452'],
  backgroundColor: 'transparent',
  title: {
    text: '投放点事件',
    textStyle: {
      color: '#fff',
      fontSize: '24px',
      fontFamily: 'Source Han Sans CN Normal',
      fontWeight: 400,
      overflow: 'truncate',
      width: 428,
    },
    top: 0,
  },
  legend: {
    right: '0%',
    orient: 'vertical',
    textStyle: {
      color: '#cfd7ff',
    },
  },
  tooltip: {},

  grid: {
    right: '0px',
    left: '40px',
    bottom: '20px',
    border: 'rgba(94, 110, 191, 0.2)',
  },
  dataset: {
    dimensions: [
      'product',
      Language.EventType(EventType.IllegalDrop),
      Language.EventType(EventType.MixedInto),
    ],
    source: [],
  },
  xAxis: {
    type: 'category',
    axisLabel: { interval: 0, color: '#cfd7ff' },
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: 'rgba(94, 110, 191, 0.2)',
      },
    },
  },
  yAxis: {
    minInterval: 1,
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(94, 110, 191, 0.2)',
      },
    },
  },
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(42,194,225,1)' },
          { offset: 0.5, color: 'rgba(42,194,225,0.7)' },
          { offset: 1, color: 'rgba(42,194,225,0.4)' },
        ]),
      },
      barWidth: '20px',
    },
    {
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(50,179,62,1)' },
          { offset: 0.5, color: 'rgba(50,179,62,0.7)' },
          { offset: 1, color: 'rgba(50,179,62,0.4)' },
        ]),
      },
      barWidth: '20px',
    },
  ],
};
