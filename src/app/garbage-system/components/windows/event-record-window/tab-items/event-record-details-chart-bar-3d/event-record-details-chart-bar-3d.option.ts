export const EventRecordDetailsChartBarD3Option: echarts.EChartsOption = {
  tooltip: {
    position: 'top',
  },
  grid: {
    height: '70%',
    top: '10%',
  },
  xAxis: {
    position: 'top',
    type: 'category',
    data: [],
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 110,
    calculable: true,
    orient: 'horizontal',
    left: '0',
    top: '99%',
    bottom: '10%',
    inRange: {
      color: [
        //'#0c1127',

        '#13224d',

        '#2d62cd',

        '#51b0c4',

        '#5ec468',

        //'#ffba00',

        '#ff8441',

        '#ca3131',
      ],
    },
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      coordinateSystem: 'cartesian2d',
      data: [],
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
